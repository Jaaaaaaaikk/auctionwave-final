// server/api/fill-in-offer-participants.js
import { defineEventHandler, getCookie, createError } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const pool = getPool();

    // Extract listing ID from query
    const listingId = event.req.url?.split('?')[1]?.split('=')[1];
    if (!listingId) {
        throw createError({ statusCode: 400, message: 'Listing ID is required' });
    }

    let decoded;
    let userId = null;
    try {
        // Get JWT token from cookie and verify it
        const token = getCookie(event, "accessToken");
        if (!token) {
            throw createError({ statusCode: 401, message: "Unauthorized" });
        }
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Invalid token' });
    }

    try {
        // Retrieve offers for the specified auction listing, including user info, offer details, profile image, and limited offer images
        const [offersRows] = await pool.query(`
            WITH LatestOffers AS (
                SELECT 
                    o.offer_id,
                    o.bidder_id AS user_id,
                    CONCAT(u.firstname, IFNULL(CONCAT(' ', u.middlename), ''), ' ', u.lastname) AS full_name,
                    o.comment,
                    o.offer_time,
                    o.review_status,
                    (SELECT profile_image_url 
                     FROM UserProfileImages 
                     WHERE user_id = u.user_id AND is_current_profile_image = TRUE 
                     LIMIT 1) AS userImageUrl
                FROM 
                    Offers o
                JOIN 
                    Users u ON o.bidder_id = u.user_id
                WHERE 
                    o.listing_id = ?
                    AND o.review_status != 'Offer Pending'
            )
            SELECT 
                lo.user_id,
                lo.full_name,
                lo.comment,
                lo.offer_time,
                lo.offer_id,
                lo.userImageUrl,
                lo.review_status,
                (SELECT GROUP_CONCAT(oi.image_url ORDER BY oi.uploaded_at ASC LIMIT 3) 
                 FROM OfferImages oi 
                 WHERE oi.offer_id = lo.offer_id) AS commentImages
            FROM 
                LatestOffers lo
            ORDER BY 
                lo.offer_time DESC;
        `, [listingId]);

        // for viewauctionmodal
        const [participatedBidders] = await pool.query(`
            WITH LatestOffers AS (
                SELECT
                    o.offer_id,
                    o.bidder_id AS user_id,
                    CONCAT(u.firstname, IFNULL(CONCAT(' ', u.middlename), ''), ' ', u.lastname) AS full_name,
                    o.comment,
                    o.offer_time,
                    o.review_status,
                    (SELECT profile_image_url 
                    FROM UserProfileImages 
                    WHERE user_id = u.user_id AND is_current_profile_image = TRUE 
                    LIMIT 1) AS userImageUrl,
                    ROW_NUMBER() OVER (PARTITION BY o.bidder_id ORDER BY o.offer_time DESC) AS row_num  -- Rank offers by offer_time for each bidder
                FROM 
                    Offers o
                JOIN 
                    Users u ON o.bidder_id = u.user_id
                WHERE 
                    o.listing_id = ?
            )

            SELECT 
                lo.user_id,
                lo.full_name,
                lo.comment,
                lo.offer_time,
                lo.offer_id,
                lo.userImageUrl,
                lo.review_status,
                (SELECT GROUP_CONCAT(oi.image_url ORDER BY oi.uploaded_at ASC LIMIT 3) 
                FROM OfferImages oi 
                WHERE oi.offer_id = lo.offer_id) AS commentImages
            FROM 
                LatestOffers lo
            WHERE 
                lo.row_num = 1 
            ORDER BY 
                lo.offer_time DESC;
        `, [listingId]);

        // Process the offer images
        offersRows.forEach(row => {
            // Ensure the images are returned as an array
            row.commentImages = row.commentImages ? row.commentImages.split(',') : [];
        });

        participatedBidders.forEach(row => {
            // Ensure the images are returned as an array
            row.commentImages = row.commentImages ? row.commentImages.split(',') : [];
        });

        return { offers: offersRows, offers2: participatedBidders, currentUserId: userId };
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database query failed' });
    }
});

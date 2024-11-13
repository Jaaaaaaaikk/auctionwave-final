import { defineEventHandler, getCookie, createError } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const pool = getPool();

    // Extract auction ID from query parameters
    const listingId = event.req.url?.split('?')[1]?.split('=')[1];

    if (!listingId) {
        throw createError({ statusCode: 400, message: 'Auction ID is required' });
    }

    let decoded;
    try {
        // Get JWT token from cookie and verify it
        const token = getCookie(event, "accessToken");
        if (!token) {
            throw createError({ statusCode: 401, message: "Unauthorized" });
        }
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Invalid token' });
    }

    try {
        // Retrieve comments made by users for the specified auction
        const [commentsRows] = await pool.query(`
            SELECT 
                o.offer_id,
                o.comment,
                o.offer_time,
                u.user_id,
                u.firstname,
                u.lastname,
                (SELECT profile_image_url FROM UserProfileImages WHERE user_id = u.user_id AND is_current_profile_image = TRUE LIMIT 1) AS userImageUrl,
                (SELECT GROUP_CONCAT(image_url ORDER BY oi.uploaded_at ASC) FROM OfferImages oi WHERE oi.offer_id = o.offer_id LIMIT 3) AS commentImages,
                o.review_status
            FROM Offers o
            JOIN Users u ON o.bidder_id = u.user_id
            WHERE o.listing_id = ?
            ORDER BY o.offer_time DESC
        `, [listingId]);

        commentsRows.forEach(row => {
            row.commentImages = row.commentImages ? row.commentImages.split(',') : [];
        });

        return { comments: commentsRows, currentUserId: decoded.userId };
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database query failed' });
    }
});

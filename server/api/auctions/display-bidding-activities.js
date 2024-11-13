import { defineEventHandler, createError, getCookie } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const {
        page = 1,
        numberOfAuctions = 10,
        selectedBidStatus = "",
        selectedOfferStatus = "",
    } = getQuery(event);

    try {
        const token = getCookie(event, "accessToken");
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const bidderId = decoded.userId;
        const pool = getPool();
        const offset = (page - 1) * numberOfAuctions;

        // Main query to get the latest bid or offer participation for each auction
        let query = `
            SELECT 
                al.listing_id,
                b.bid_id,
                o.offer_id,
                al.name AS auction_name,
                al.created_at,
                al.bidding_type,
                -- Get the latest bid_time or offer_time based on auction type
                CASE 
                    WHEN al.bidding_type = 'Lowest-type' THEN MAX(b.bid_time)
                    WHEN al.bidding_type = 'Offer-type' THEN MAX(o.offer_time)
                END AS latest_time,
                al.uuid,
                al.bidding_type,
                CASE 
                    WHEN al.bidding_type = 'Lowest-type' THEN b.bid_amount
                    ELSE NULL
                END AS bid_amount,
                CASE 
                    WHEN al.bidding_type = 'Lowest-type' THEN b.status
                    WHEN al.bidding_type = 'Offer-type' THEN o.review_status
                END AS status 
            FROM AuctionListings al
            -- Left join on Bids table for Lowest-type auctions
            LEFT JOIN Bids b ON al.listing_id = b.listing_id 
                AND b.bidder_id = ?
            -- Left join on Offers table for Offer-type auctions
            LEFT JOIN Offers o ON al.listing_id = o.listing_id 
                AND o.bidder_id = ?
            WHERE al.listing_id IN (
                SELECT listing_id 
                FROM Bids 
                WHERE bidder_id = ?
                UNION
                SELECT listing_id
                FROM Offers
                WHERE bidder_id = ?
            )
            GROUP BY al.listing_id, al.name, al.created_at, al.uuid, al.bidding_type
            ORDER BY latest_time DESC
            LIMIT ? OFFSET ?;

        `;

        const queryParams = [bidderId, bidderId, bidderId, bidderId, Number(numberOfAuctions), Number(offset)];

        if (selectedBidStatus) {
            query += " AND b.status = ?";
            queryParams.push(selectedBidStatus);
        }

        if (selectedOfferStatus) {
            query += " AND o.review_status = ?";
            queryParams.push(selectedOfferStatus);
        }

        const [rows] = await pool.query(query, queryParams);

        // Query to count the total distinct auctions participated by the bidder
        let totalCountQuery = `
            SELECT COUNT(DISTINCT al.listing_id) AS total
            FROM AuctionListings al
            LEFT JOIN Bids b ON al.listing_id = b.listing_id 
                AND b.bidder_id = ?
            LEFT JOIN Offers o ON al.listing_id = o.listing_id 
                AND o.bidder_id = ?
            WHERE al.listing_id IN (
                SELECT listing_id 
                FROM Bids 
                WHERE bidder_id = ?
                UNION
                SELECT listing_id
                FROM Offers
                WHERE bidder_id = ?
            )
        `;

        const totalCountParams = [bidderId, bidderId, bidderId, bidderId];

        if (selectedBidStatus) {
            totalCountQuery += " AND b.status = ?";
            totalCountParams.push(selectedBidStatus);
        }

        if (selectedOfferStatus) {
            totalCountQuery += " AND o.review_status = ?";
            totalCountParams.push(selectedOfferStatus);
        }

        const [totalResult] = await pool.query(totalCountQuery, totalCountParams);
        const totalCount = totalResult[0]?.total || 0;
        const totalPages = Math.ceil(totalCount / numberOfAuctions);

        return {
            auctions: rows,
            totalPages,
            currentPage: Number(page),
        };
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Internal Server Error",
        });
    }
});

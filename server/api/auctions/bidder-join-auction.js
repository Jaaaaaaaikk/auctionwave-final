import { defineEventHandler, readBody, getCookie } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const pool = await getPool();
    const { auctionId } = await readBody(event);

    let decodedToken;
    try {
        const token = getCookie(event, "accessToken");
        if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return { statusCode: 401, json: { message: "Invalid token" } };
    }

    const bidderId = decodedToken.userId;

    try {
        // Retrieve listing_id from UUID
        const [result] = await pool.query(`SELECT listing_id FROM AuctionListings WHERE uuid = ?`, [auctionId]);
        if (result.length === 0) return { statusCode: 404, json: { message: 'Auction not found' } };

        const listingId = result[0].listing_id;

        // Check if an entry already exists for this listing and bidder
        const [existing] = await pool.query(
            `SELECT participant_id FROM AuctionVisits WHERE listing_id = ? AND bidder_id = ?`,
            [listingId, bidderId]
        );

        if (existing.length > 0) {
            // Entry exists, update `last_interaction_at` only
            await pool.query(
                `UPDATE AuctionVisits SET last_interaction_at = NOW() WHERE participant_id = ?`,
                [existing[0].participant_id]
            );
        } else {
            // No entry exists, insert a new row
            await pool.query(
                `INSERT INTO AuctionVisits (listing_id, bidder_id, initial_joined_at, last_interaction_at)
                 VALUES (?, ?, NOW(), NOW())`,
                [listingId, bidderId]
            );
        }

        return { statusCode: 200, json: { status: 'success' } };
    } catch (error) {
        return { statusCode: 500, json: { message: 'Internal Server Error' } };
    }
});


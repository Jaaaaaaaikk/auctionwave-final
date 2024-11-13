import { defineEventHandler, getCookie } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const pool = await getPool();

    try {
        const token = getCookie(event, "accessToken");
        if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const userType = decoded.userType;

        let notifications;
        if (userType === 'Auctioneer') {
            [notifications] = await pool.query(
                `SELECT 
                    n.*, 
                    a.uuid AS auction_uuid, 
                    a.bidding_type, 
                    COALESCE(CONCAT(sender.firstname, IFNULL(CONCAT(' ', sender.middlename), ''), ' ', sender.lastname), 'AuctionWave System') AS sender_full_name,
                    CONCAT(receiver.firstname, IFNULL(CONCAT(' ', receiver.middlename), ''), ' ', receiver.lastname) AS receiver_full_name
                FROM 
                    Notifications n
                JOIN 
                    AuctionListings a ON n.auction_id = a.listing_id
                LEFT JOIN 
                    Users sender ON n.sender_id = sender.user_id  -- Use LEFT JOIN for optional sender
                JOIN 
                    Users receiver ON n.receiver_id = receiver.user_id  -- Receiver join
                WHERE 
                    a.auctioneer_id = ? AND n.receiver_id = ?
                ORDER BY    
                    n.created_at DESC;`,
                [userId, userId]
            );
        } else if (userType === 'Bidder') {
            [notifications] = await pool.query(
                `SELECT 
                    n.*, 
                    a.uuid AS auction_uuid, 
                    a.bidding_type, 
                    COALESCE(CONCAT(sender.firstname, IFNULL(CONCAT(' ', sender.middlename), ''), ' ', sender.lastname), 'AuctionWave System') AS sender_full_name,
                    CONCAT(receiver.firstname, IFNULL(CONCAT(' ', receiver.middlename), ''), ' ', receiver.lastname) AS receiver_full_name
                FROM 
                    Notifications n
                JOIN 
                    AuctionListings a ON n.auction_id = a.listing_id
                LEFT JOIN 
                    Users sender ON n.sender_id = sender.user_id  -- Use LEFT JOIN for optional sender
                JOIN 
                    Users receiver ON n.receiver_id = receiver.user_id  -- Receiver join
                WHERE 
                    n.receiver_id = ?
                ORDER BY 
                    n.created_at DESC;`,
                [userId]
            );
        } else {
            throw createError({ statusCode: 403, statusMessage: "Forbidden" });
        }

        return { success: true, notifications };
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw createError({ statusCode: 500, message: 'Internal server error' });
    }
});

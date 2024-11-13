import { defineEventHandler, getCookie, readBody } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const pool = await getPool();
    const appSocket = event.context.appSocket;

    // Read request body
    const { offerId, action } = await readBody(event);

    // Validate input
    if (!offerId || !action || !['Provide More', 'Accept Offer', 'Discard Offer'].includes(action)) {
        throw createError({ statusCode: 400, statusMessage: "Invalid input" });
    }

    // Retrieve and verify token
    const token = getCookie(event, "accessToken");
    if (!token) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    // Decode token and validate auctioneer role
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.userType !== 'Auctioneer') {
            throw createError({ statusCode: 403, statusMessage: "Forbidden" });
        }
    } catch (error) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    // Fetch bidder_id, listing_id, and auctioneer's full name
    const [offer] = await pool.query(`
        SELECT o.bidder_id, o.listing_id,
               CONCAT(u.firstname, IFNULL(CONCAT(' ', u.middlename), ''), ' ', u.lastname) AS sender_full_name
        FROM Offers AS o
        JOIN Users AS u ON u.user_id = ?
        WHERE o.offer_id = ?
    `, [decodedToken.userId, offerId]);

    if (!offer) {
        throw createError({ statusCode: 404, statusMessage: "Offer not found" });
    }


    const bidder_id = offer[0].bidder_id;
    const listing_id = offer[0].listing_id;
    const sender_full_name = offer[0].sender_full_name;

    // Determine the new status based on the action
    let newStatus;
    let notificationMessage;
    switch (action) {
        case 'Provide More':
            newStatus = 'Provide More';
            notificationMessage = `${sender_full_name} requested more details for your offer.`;
            break;
        case 'Accept Offer':
            newStatus = 'Offer Accepted';
            notificationMessage = `${sender_full_name} accepted your offer. You are the winner.`;
            break;
        case 'Discard Offer':
            newStatus = 'Offer Discarded';
            notificationMessage = `${sender_full_name} discarded your offer.`;
            break;
        default:
            throw createError({ statusCode: 400, statusMessage: "Invalid action" });
    }

    // Update offer status in the database
    try {
        const [updateResult] = await pool.query(
            'UPDATE Offers SET review_status = ? WHERE offer_id = ?',
            [newStatus, offerId]
        );

        if (updateResult.affectedRows === 0) {
            throw createError({ statusCode: 404, statusMessage: "Offer not found" });
        }

        // Insert notification into the Notifications table
        await pool.query(`
            INSERT INTO Notifications (sender_id, receiver_id, auction_id, notification_type, message, is_read)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            decodedToken.userId,       // sender_id (auctioneer)
            bidder_id,     // receiver_id (bidder)
            listing_id,          // auction_id
            'Response',                // notification_type
            notificationMessage,       // message
            false                      // is_read
        ]);

        const [unreadCount] = await pool.query(
            `SELECT COUNT(*) AS unread_count FROM Notifications WHERE receiver_id = ? AND is_read = false`,
            [bidder_id]
        );

        // Emit the notification on the response-channel
        appSocket.to(`user-${bidder_id}`).emit('response-channel', {
            recipientId: bidder_id,
            notification: {
                message: notificationMessage
            }
        });

        return { message: `Offer status updated to ${newStatus} and notification sent` };
    } catch (error) {
        console.error("Error updating offer status or sending notification:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});

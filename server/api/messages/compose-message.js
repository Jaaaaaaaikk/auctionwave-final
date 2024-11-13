import { defineEventHandler, readBody, getCookie, createError } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, "accessToken");
    if (!token) {
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return { status: 401, json: { message: "Invalid token" } };
    }

    const senderId = decodedToken.userId;
    const body = await readBody(event);
    const { recipientId, subject, messageBody } = body;

    if (!recipientId || !subject || !messageBody) {
        throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
    }

    const pool = await getPool();

    try {
        await pool.query("START TRANSACTION");

        const [result] = await pool.query(
            'INSERT INTO Messages (sender_id, subject, message) VALUES (?, ?, ?)',
            [senderId, subject, messageBody]
        );

        const messageId = result.insertId;
        const createdAt = new Date();  // Store timestamp

        await pool.query(
            'INSERT INTO MessageParticipants (message_id, user_id, role, status) VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
            [messageId, senderId, 'sender', 'Sent', messageId, recipientId, 'recipient', 'Received']
        );

        // Query to get unread count for the recipient
        const [unreadCountResult] = await pool.query(
            'SELECT COUNT(*) AS unread_count FROM MessageParticipants WHERE user_id = ? AND is_read = false AND status = ?',
            [recipientId, 'Received']
        );

        const unreadCount = unreadCountResult[0].unread_count;

        // Query to get the sender's full name
        const [senderNameResult] = await pool.query(
            `SELECT CONCAT(u.firstname, 
                                IFNULL(CONCAT(' ', u.middlename), ''), 
                                ' ', 
                                u.lastname) AS sender_name 
                     FROM Users u 
                     WHERE u.user_id = ?`,
            [senderId]
        );

        const senderName = senderNameResult[0]?.sender_name || "Unknown Sender"; // Default if sender not found

        await pool.query("COMMIT");

        return { status: "success", sender_id: senderId, sender_name: senderName, created_at: createdAt, messageId, unreadCount };
    } catch (error) {
        console.error("Error sending message:", error);
        await pool.query("ROLLBACK");
        throw createError({ statusCode: 500, statusMessage: "Failed to send message" });
    }
});

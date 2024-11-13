import { defineEventHandler, getCookie, createError } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    // Retrieve the access token from cookies
    const token = getCookie(event, "accessToken");

    if (!token) {
        // No token found, return an unauthorized error
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }

    // Extract sender_id from the decoded token
    const senderId = decodedToken.userId;

    try {
        // Get a database connection pool
        const pool = await getPool();

        // Fetch messages sent by the sender from the database along with recipient names
        const [messages] = await pool.query(
            `
            SELECT 
                DISTINCT m.message_id, 
                m.subject, 
                m.message, 
                m.created_at, 
                CONCAT(u.firstname, IFNULL(CONCAT(' ', u.middlename), ''), ' ', u.lastname) AS recipient_name 
            FROM 
                 MessageParticipants mp
            JOIN
                Messages m ON mp.message_id = m.message_id
            JOIN 
                Users u ON mp.user_id = u.user_id 
            WHERE 
                m.sender_id = 12 AND mp.role = 'recipient'
            ORDER BY m.created_at DESC
            `,
            [senderId]
        );


        // Return the fetched messages
        return { messages };
    } catch (error) {
        console.error('Error fetching sent messages:', error);
        throw createError({ statusCode: 500, statusMessage: 'Failed to fetch messages' });
    }
});

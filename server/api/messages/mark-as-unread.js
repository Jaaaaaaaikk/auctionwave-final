import { defineEventHandler, readBody, getCookie, createError } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    // Retrieve the access token from cookies
    const token = getCookie(event, "accessToken");

    if (!token) {
        // No token found, return an unauthorized error
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    let userId;

    try {
        // Verify the token and extract user information
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        userId = decodedToken.userId;

    } catch (error) {
        // If token verification fails, return an unauthorized error
        throw createError({ statusCode: 401, statusMessage: "Invalid Token" });
    }

    const body = await readBody(event);
    const messageId = body.id;

    if (!messageId) {
        return {
            statusCode: 400,
            body: { message: "Message ID is required" },
        };
    }

    const pool = getPool();

    try {
        // Update the MessageParticipants to mark it as read only if it belongs to the current user
        const [result] = await pool.query(
            "UPDATE MessageParticipants SET is_read = FALSE WHERE message_id = ? AND user_id = ?",
            [messageId, userId]
        );

        if (result.affectedRows === 0) {
            return {
                statusCode: 404,
                body: { message: "Message not found or not owned by the user" },
            };
        }

        return {
            statusCode: 200,
            body: { message: "Message marked as unread" },
        };
    } catch (error) {
        console.error("Error marking Message as unread:", error);
        return {
            statusCode: 500,
            body: { message: "Internal Server Error" },
        };
    }
});

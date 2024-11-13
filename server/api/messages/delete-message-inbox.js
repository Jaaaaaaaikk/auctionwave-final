import { defineEventHandler, readBody, getCookie } from "h3";
import { getPool } from "../../db";

export default defineEventHandler(async (event) => {

    const token = getCookie(event, "accessToken");

    if (!token) {
        // No token found, return an unauthorized error
        throw createError({ status: 401, statusMessage: "Unauthorized" });
    }

    const body = await readBody(event);
    const messageId = body.id;

    // Check if notification ID is provided
    if (!messageId) {
        return {
            status: 400, // Bad Request
            body: { message: "Message ID is required" },
        };
    }

    const pool = getPool();

    try {
        // Execute the DELETE query
        const [result] = await pool.query(
            "DELETE FROM MessageParticipants WHERE message_id = ?",
            [messageId]
        );

        // If no rows were affected, notification was not found
        if (result.affectedRows === 0) {
            return {
                status: 404, // Not Found
                body: { success: false, message: "Message not found." },
            };
        }

        // Return success if the message was deleted
        return {
            status: 200, // OK
            body: { success: true, message: "Message deleted successfully." },
        };
    } catch (error) {
        console.error("Error deleting message:", error);
        return {
            status: 500, // Internal Server Error
            body: { success: false, message: "Failed to delete message." },
        };
    }
});

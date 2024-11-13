import { defineEventHandler, readBody, getCookie } from "h3";
import { getPool } from "../../db";

export default defineEventHandler(async (event) => {

    const token = getCookie(event, "accessToken");

    if (!token) {
        // No token found, return an unauthorized error
        throw createError({ status: 401, statusMessage: "Unauthorized" });
    }

    const body = await readBody(event);
    const notificationId = body.id;

    // Check if notification ID is provided
    if (!notificationId) {
        return {
            status: 400, // Bad Request
            body: { message: "Notification ID is required" },
        };
    }

    const pool = getPool();

    try {
        // Execute the DELETE query
        const [result] = await pool.query(
            "DELETE FROM Notifications WHERE notification_id = ?",
            [notificationId]
        );

        // If no rows were affected, notification was not found
        if (result.affectedRows === 0) {
            return {
                status: 404, // Not Found
                body: { success: false, message: "Notification not found." },
            };
        }

        // Return success if the notification was deleted
        return {
            status: 200, // OK
            body: { success: true, message: "Notification deleted successfully." },
        };
    } catch (error) {
        console.error("Error deleting notification:", error);
        return {
            status: 500, // Internal Server Error
            body: { success: false, message: "Failed to delete notification." },
        };
    }
});

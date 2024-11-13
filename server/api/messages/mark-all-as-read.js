import { defineEventHandler, createError, getCookie } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const accessToken = getCookie(event, 'accessToken'); // Retrieve the access token from cookies

    if (!accessToken) {
        throw createError({ statusCode: 401, statusMessage: 'Access token is required.' });
    }

    let userId;
    try {
        // Verify the token and extract the user ID
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET); // Replace with your JWT secret
        userId = decoded.userId; // Assuming the userId is stored in the token payload
    } catch (error) {
        console.error("Invalid access token:", error);
        throw createError({ statusCode: 401, statusMessage: 'Invalid access token.' });
    }

    try {
        const pool = await getPool(); // Get the database connection pool
        const [result] = await pool.execute(
            'UPDATE MessageParticipants SET is_read = TRUE WHERE user_id = ?',
            [userId]
        );

        // Check if any rows were affected (updated)
        if (result.affectedRows === 0) {
            throw createError({ statusCode: 404, statusMessage: 'No Message found for this user.' });
        }

        return {
            status: 'success',
            message: `Marked ${result.affectedRows} Message as read.`,
        };
    } catch (error) {
        console.error("Error marking Message as read:", error);
        throw createError({ statusCode: 500, statusMessage: 'Internal server error.' });
    }
});

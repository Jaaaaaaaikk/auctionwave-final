import { defineEventHandler, getCookie, createError } from "h3";
import { getPool } from "../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    try {
        // Retrieve the access token from cookies
        const token = getCookie(event, "accessToken");

        if (!token) {
            // No token found, return an unauthorized error
            throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }

        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret key
        const userId = decoded.userId; // Get userId from decoded token

        const pool = await getPool();

        // Query to retrieve all user profile images except the current profile image
        const [images] = await pool.query(
            `SELECT profile_image_id, profile_image_url
       FROM UserProfileImages
       WHERE user_id = ? AND is_current_profile_image = FALSE`,
            [userId]
        );

        // Return the list of images
        return {
            uploads: images.map(image => ({
                profile_image_id: image.profile_image_id,
                profile_image_url: `http://localhost:3000${image.profile_image_url}` // Ensure correct path
            }))
        };
    } catch (error) {
        console.error("Error fetching user uploads:", error.message);
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch uploads" });
    }
});

import { defineEventHandler, getCookie, createError } from "h3";
import jwt from "jsonwebtoken";
import { getPool } from "../db"; // Ensure this is imported if you're querying the database

export default defineEventHandler(async (event) => {
  try {
    // Retrieve the access token from cookies
    const token = getCookie(event, "accessToken");

    if (!token) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Ensure userId is extracted from the token

    const pool = await getPool(); // Get database connection

    // Query to get the current profile image for the user
    const [profileImage] = await pool.query(
      `SELECT profile_image_url 
       FROM UserProfileImages 
       WHERE user_id = ? AND is_current_profile_image = TRUE`,
      [userId]
    );

    
    const user_profile_picture = profileImage.length ? profileImage[0].profile_image_url.toString() : null;

    return {
      profile: {
        profileImage: user_profile_picture, // Return the constructed data URL
      },
    };
  } catch (error) {
    console.error("Error retrieving profile image:", error.message);
    throw createError({ statusCode: 500, message: "Internal Server Error" });
  }
});

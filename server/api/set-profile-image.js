import { defineEventHandler, getCookie, createError, readBody } from "h3";
import { getPool } from "../db"; // Adjust path to your database setup
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const pool = await getPool();

  try {
    // Retrieve the access token from cookies
    const token = getCookie(event, "accessToken");
    if (!token) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }

    const userId = decodedToken.userId;

    // Get the profile_image_id from the request body
    const { profile_image_id } = await readBody(event); // Make sure to import useBody from h3

    // Mark all current images as not current
    await pool.query("UPDATE UserProfileImages SET is_current_profile_image = FALSE WHERE user_id = ?", [userId]);

    // Set the specified image as the current profile picture
    await pool.query("UPDATE UserProfileImages SET is_current_profile_image = TRUE WHERE profile_image_id = ? AND user_id = ?", [
      profile_image_id,
      userId,
    ]);

    const [profileImage] = await pool.query(
      `SELECT profile_image_url 
       FROM UserProfileImages 
       WHERE user_id = ? AND is_current_profile_image = TRUE`,
      [userId]
    );

    const user_profile_picture = profileImage.length ? profileImage[0].profile_image_url.toString() : null;


    return { user_profile_picture, message: "Profile image updated successfully."};
  } catch (error) {
    console.error("Error setting profile image:", error);
    throw createError({ statusCode: 500, statusMessage: "Failed to set profile image." });
  }
});

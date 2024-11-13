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
  const notificationId = body.id;

  if (!notificationId) {
    return {
      statusCode: 400,
      body: { message: "Notification ID is required" },
    };
  }

  const pool = getPool();

  try {
    // Update the notification to mark it as read only if it belongs to the current user
    const [result] = await pool.query(
      "UPDATE Notifications SET is_read = TRUE WHERE notification_id = ? AND receiver_id = ?",
      [notificationId, userId]
    );

    if (result.affectedRows === 0) {
      return {
        statusCode: 404,
        body: { message: "Notification not found or not owned by the user" },
      };
    }

    return {
      statusCode: 200,
      body: { message: "Notification marked as read" },
    };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return {
      statusCode: 500,
      body: { message: "Internal Server Error" },
    };
  }
});

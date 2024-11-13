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

    // Verify and decode JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your actual secret key

    // Extract userId from decoded token
    const userId = decoded.userId;

    const pool = await getPool();

    // Query to get user profile from the Users table
    const [user] = await pool.query(
      `SELECT u.user_id, u.firstname, u.middlename, u.lastname, u.email, u.about, u.location_id
       FROM Users u 
       WHERE u.user_id = ?`,
      [userId],
    );

    if (!user.length) {
      throw createError({ statusCode: 404, message: "User not found" });
    }

    // Query to get location name associated with the user
    const [location] = await pool.query(
      `SELECT l.location_name 
       FROM Locations l 
       WHERE l.location_id = ?`,
      [user[0].location_id],
    );

    // Query to get categories associated with the bidder
    const [categories] = await pool.query(
      `SELECT c.category_name
           FROM Bidders b
           JOIN Categories c ON b.category_id = c.category_id
           WHERE b.bidder_id = ?`,
      [userId],
    );

    // Construct the response
    return {
      profile: {
        firstName: user[0].firstname,
        middleName: user[0].middlename,
        lastName: user[0].lastname,
        email: user[0].email,
        location: location.length ? location[0].location_name : "Unknown", // Handle case if location is not found
        categories: categories.map((c) => c.category_name),
        about: user[0].about
      },
    };

  } catch (error) {
    console.error("Error:", error.message);
    throw createError({ statusCode: 401, message: "Invalid or expired token" });
  }
});

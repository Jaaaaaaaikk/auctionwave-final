import { defineEventHandler, getCookie, createError, readBody } from "h3";
import { getPool } from "../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    // Retrieve the access token from cookies
    const token = getCookie(event, "accessToken");

    if (!token) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    // Verify and decode JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Read body and retrieve the provided fields
    const { firstName, middleName, lastName, location_id, about, categories } = await readBody(event);

    const pool = await getPool();

    // Update user fields if they are provided
    const updateQueries = [];
    const updateValues = [];

    if (firstName) {
      updateQueries.push("firstname = ?");
      updateValues.push(firstName);
    }
    if (middleName !== undefined) {
      updateQueries.push("middlename = ?");
      updateValues.push(middleName === "" ? null : middleName);
    }
    if (lastName) {
      updateQueries.push("lastname = ?");
      updateValues.push(lastName);
    }

    let locationUpdated = false;
    if (location_id) {
      updateQueries.push("location_id = ?");
      updateValues.push(location_id);
      locationUpdated = true;
    }
    if (about) {
      updateQueries.push("about = ?");
      updateValues.push(about);
    }

    // Add userId for the WHERE clause
    updateValues.push(userId);

    if (updateQueries.length > 0) {
      const updateQuery = `UPDATE Users SET ${updateQueries.join(", ")}, updated_at = NOW() WHERE user_id = ?`;
      await pool.query(updateQuery, updateValues);
    }

    // Handle category updates
    if (categories) {
      // Step 1: Fetch category IDs from names
      const [categoryResults] = await pool.query(
        "SELECT category_id FROM Categories WHERE category_name IN (?)",
        [categories]
      );

      const categoryIds = categoryResults.map(row => row.category_id);

      // Fetch existing categories for the user
      const [existingCategories] = await pool.query(
        "SELECT category_id FROM Bidders WHERE bidder_id = ?",
        [userId]
      );

      const existingCategoryIds = existingCategories.map(row => row.category_id);

      // Find new categories to add
      const newCategories = categoryIds.filter(
        (categoryId) => !existingCategoryIds.includes(categoryId)
      );

      // Find categories to remove
      const categoriesToRemove = existingCategoryIds.filter(
        (categoryId) => !categoryIds.includes(categoryId)
      );

      // Add new categories
      if (newCategories.length > 0) {
        const values = newCategories.map((categoryId) => [userId, categoryId]);
        await pool.query(
          "INSERT INTO Bidders (bidder_id, category_id) VALUES ?",
          [values]
        );
      }

      // Remove categories
      if (categoriesToRemove.length > 0) {
        await pool.query(
          "DELETE FROM Bidders WHERE bidder_id = ? AND category_id IN (?)",
          [userId, categoriesToRemove]
        );
      }
    }

    // Regenerate JWT token if location was updated
    if (locationUpdated) {
      const newToken = jwt.sign(
        { userId, user_Location: location_id, userType: decoded.userType },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Set the updated token as an HTTP-only cookie
      setHeader(event, "Set-Cookie", `accessToken=${newToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${24 * 60 * 60}`);
    }

    return { message: "Profile and categories updated successfully" };
  } catch (error) {
    console.error("Error:", error.message);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});

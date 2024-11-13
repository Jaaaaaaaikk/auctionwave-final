import { defineEventHandler, readBody, sendError, createError } from 'h3';
import bcrypt from 'bcryptjs';
import { getPool } from '../db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    firstname,
    middlename,
    lastname,
    email,
    location_id,
    password,
    userType,
    categories
  } = body;

  // Validate required fields
  if (!firstname || !lastname || !email || !password || !userType || !location_id) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "All fields are required" }));
  }

  // Validate that at least one category is provided for Bidder
  if (userType === 'Bidder' && (!categories || categories.length === 0)) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'At least one category is required for Bidder' }));
  }

  let connection;
  try {
    const pool = getPool();
    connection = await pool.getConnection();

    // Check if location exists
    const [locationExists] = await connection.execute('SELECT 1 FROM Locations WHERE location_id = ?', [location_id]);

    if (locationExists.length === 0) {
      return sendError(event, createError({ statusCode: 400, statusMessage: `Location with ID '${location_id}' does not exist` }));
    }

    // Check if the email is already registered
    const [existingEmailUsers] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);

    if (existingEmailUsers.length > 0) {
      return sendError(event, createError({ statusCode: 409, statusMessage: 'User already exists with the provided email' }));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const query = `
      INSERT INTO Users (firstname, middlename, lastname, email, location_id, password, about, user_type)
      VALUES (?, ?, ?, ?, ?, ?, 'No information yet.',?)
    `;
    const [result] = await connection.execute(query, [
      firstname,
      middlename,
      lastname,
      email,
      location_id,
      hashedPassword,
      userType
    ]);

    const userId = result.insertId;

    // Insert into Bidders table if user is a Bidder
    if (userType === 'Bidder') {
      for (const categoryName of categories) {
        const [categoryExists] = await connection.execute(
          'SELECT 1 FROM Categories WHERE category_name = ?',
          [categoryName]
        );

        if (categoryExists.length === 0) {
          return sendError(event, createError({ statusCode: 400, statusMessage: `Category '${categoryName}' does not exist` }));
        }

        const [categoryIdResult] = await connection.execute(
          'SELECT category_id FROM Categories WHERE category_name = ?',
          [categoryName]
        );
        const categoryId = categoryIdResult[0]?.category_id;

        await connection.execute(
          'INSERT INTO Bidders (bidder_id, category_id) VALUES (?, ?)',
          [userId, categoryId]
        );
      }
    }

    // Delete OTP
    await connection.execute(
      "DELETE FROM OTPs WHERE email = ?",
      [email]
    );

    return { status: 201, json: { message: "User Created successfully" } };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500, json: { message: "Internal server error" } };
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

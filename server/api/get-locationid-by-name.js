import { defineEventHandler, readBody, createError, getCookie } from 'h3';
import { getPool } from '../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  let connection;

  try {
    // Retrieve the access token from cookies
    const token = getCookie(event, "accessToken");

    if (!token) {
      // No token found, return an unauthorized error
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    let userLocation;
    try {

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      userLocation = decodedToken.user_Location;
    } catch (error) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired token',
      });
    }

    const pool = getPool();
    connection = await pool.getConnection();

    const [results] = await connection.execute(
      'SELECT location_name FROM Locations WHERE location_id = ?',
      [userLocation]
    );

    if (results.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Location not found',
      });
    }

    const location = results[0];
    return { location_id: userLocation, locationName: location.location_name };
  } catch (error) {
    console.error('Error fetching location ID:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch location ID',
    });
  } finally {
    if (connection) connection.release();
  }
});

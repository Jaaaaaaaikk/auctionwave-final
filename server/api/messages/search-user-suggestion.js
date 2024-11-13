import { defineEventHandler, getCookie, createError } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    // Retrieve the access token from cookies
    const token = getCookie(event, "accessToken");

    if (!token) {
        // No token found, return an unauthorized error
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }

    // Get the query parameter for name search
    const searchTerm1 = event.req.url?.split('?')[1]; // Get the query string from the URL
    const params = new URLSearchParams(searchTerm1); // Use URLSearchParams to parse the query string
    const searchTerm = params.get('q')?.trim(); // Get the value of 'q' and trim it

    if (!searchTerm) {
        throw createError({ statusCode: 400, statusMessage: "Bad Request" });
    }

    const connection = await getPool().getConnection();
    try {
        const [rows] = await connection.execute(
            `SELECT user_id, firstname, lastname, email 
             FROM Users 
             WHERE firstname LIKE ? 
                OR lastname LIKE ? 
                OR email LIKE ? 
             LIMIT 10`,
            [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
        );

        return rows;
    } catch (error) {
        console.error(error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    } finally {
        connection.release();
    }
});

import { defineEventHandler, getCookie } from "h3";
import jwt from "jsonwebtoken";


export default defineEventHandler(async (event) => {

    const token = getCookie(event, "accessToken");

    if (!token) {
        // No token found, return an unauthorized error
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
        let userType;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        userType = decodedToken.userType;

        return { userType };
    } catch (error) {
        console.error("Error:", error.message);
        throw createError({ statusCode: 401, message: "Invalid or expired token" });
    }
});
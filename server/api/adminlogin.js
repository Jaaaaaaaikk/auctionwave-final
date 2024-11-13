import { defineEventHandler, readBody, createError, setHeader } from "h3";
import { getPool } from "../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { email, password } = body;

        if (!email || !password) {
            throw createError({
                statusCode: 400,
                statusMessage: "Email and password are required",
            });
        }

        const pool = await getPool();

        // Fetch user by email
        const [results] = await pool.execute(
            "SELECT * FROM Admindetails WHERE email = ?",
            [email]
        );
        const user = results[0];

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: "Invalid email or password",
            });
        }

        // Generate the access token, including profile image URL in the payload
        const accessToken = jwt.sign(
            {
                adminId: user.admin_id,
                userType: user.user_type,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set the access token as an HTTP-only, secure cookie
        setHeader(event, "Set-Cookie", `accessToken=${accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${24 * 60 * 60}`); // 24 hours

        // Return a success message and some user data (without the token)
        return {
            message: "Login successful",
            user: {
                id: user.admin_id,
                email: user.email,
                userType: user.user_type,
            },
        };
    } catch (error) {
        console.error("Login error:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Invalid Credentials",
        });
    }
});

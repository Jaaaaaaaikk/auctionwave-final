import { defineEventHandler, readBody, createError, setHeader } from "h3";
import { getPool } from "../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    const user = results[0];

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    const [profileImage] = await pool.query(
      `SELECT profile_image_url 
       FROM UserProfileImages 
       WHERE user_id = ? AND is_current_profile_image = TRUE`,
      [user.user_id]
    );

    const user_profile_picture = profileImage.length ? profileImage[0].profile_image_url.toString() : '/images/default-profile-image.png';

    // Generate the access token, including profile image URL in the payload
    const accessToken = jwt.sign(
      { 
        userId: user.user_id, 
        user_Location: user.location_id, 
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
      user_profile_picture,
      user: {
        id: user.user_id,
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

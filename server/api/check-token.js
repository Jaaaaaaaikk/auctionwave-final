import { defineEventHandler, getCookie } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, "accessToken");

  if (!accessToken) {
    // No access token found
    return { isLoggedIn: false };
  }

  let userType;
  try {

    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    userType = decodedToken.userType;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token',
    });
  }
  return { isLoggedIn: true, userType };
});

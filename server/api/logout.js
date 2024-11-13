import { defineEventHandler, createError, getCookie } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const accessToken = getCookie(event, "accessToken");

    if (!accessToken) {
      console.error("No access token provided in cookies");
      throw createError({
        statusCode: 400,
        statusMessage: "Access token is required",
      });
    }

    setHeader(event, "Set-Cookie", `accessToken=; HttpOnly; Path=/; Max-Age=0;`);

    return { message: "Logout successful" };
  } catch (error) {
    console.error("Logout error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});

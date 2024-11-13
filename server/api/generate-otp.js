import { defineEventHandler, readBody } from "h3";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { getPool } from "../db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) {
    return { status: 400, json: { message: "Email is required" } };
  }

  const pool = getPool();
  const connection = await pool.getConnection();

  try {
    // Check if there is an existing OTP for this email that has not expired
    const [existingOtp] = await connection.execute(
      "SELECT * FROM OTPs WHERE email = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
      [email]
    );

    if (existingOtp.length > 0) {
      // If OTP already exists and is not expired, return a message to the user
      return {
        status: 400,
        json: { message: "An OTP has already been sent. Please wait until it expires." }
      };
    }

    // Generate a new OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
    });

    // Save OTP to database with 1-minute expiry
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
    await connection.execute(
      "INSERT INTO OTPs (email, otp, expires_at) VALUES (?, ?, ?)",
      [email, otp, expiresAt]
    );

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    });

    return { status: 200, json: { message: "OTP sent successfully" } };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, json: { message: "Internal server error" } };
  } finally {
    connection.release();
  }
});

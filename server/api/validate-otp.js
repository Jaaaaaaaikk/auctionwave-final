import { defineEventHandler, readBody } from 'h3';
import { getPool } from '../db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, otp } = body;

  // Ensure both email and OTP are provided
  if (!email || !otp) {
    return { success: false, message: 'Email and OTP are required.' };
  }

  try {
    const pool = getPool();
    const connection = await pool.getConnection();

    // Verify OTP
    const [results] = await connection.execute(
      'SELECT otp, expires_at FROM OTPs WHERE email = ? AND otp = ?',
      [email, otp]
    );

    // Check if OTP is found
    if (results.length > 0) {
      const { expires_at } = results[0];
      const now = new Date();

      // Check if OTP has expired
      if (now <= new Date(expires_at)) {
        // OTP is valid
        connection.release();
        return { success: true, message: 'OTP verified successfully.' };
      } else {
        connection.release();
        return { success: false, message: 'OTP has expired.' };
      }
    } else {
      connection.release();
      return { success: false, message: 'Invalid OTP.' };
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'An error occurred.' };
  }
});

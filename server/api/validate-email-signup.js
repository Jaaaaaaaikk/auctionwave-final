import { defineEventHandler, readBody } from 'h3';
import { getPool } from '../db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  try {
    const pool = getPool();
    const connection = await pool.getConnection();

    // Verify email input
    const [results] = await connection.execute(
      'SELECT email FROM users WHERE email = ?',
      [email]
    );

    connection.release();
    
    if (results.length > 0) {
      return { success: false, message: 'Email is already in use.' };
    } else {
      return { success: true, message: 'Email is available.' };
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'An error occurred.' };
  }
});

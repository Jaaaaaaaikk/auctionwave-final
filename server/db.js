import mysql from "mysql2/promise";

// MySQL database configuration
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: "",
  database: process.env.DATABASE,
};

// MySQL connection pool
const pool = mysql.createPool(dbConfig);

export const getPool = () => pool;

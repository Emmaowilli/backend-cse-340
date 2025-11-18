// database/index.js
const { Pool } = require("pg");

// Load .env locally only
if (!process.env.DATABASE_URL) {
  require("dotenv").config();
}

/*
  Render PostgreSQL requires SSL.
  We force SSL unless we are on localhost explicitly.
*/

const isLocalhost = process.env.LOCAL === "true";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocalhost
    ? false                   // local development only
    : { rejectUnauthorized: false },  // Render
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
});

// Helper query method for logging
async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

module.exports = { pool, query };

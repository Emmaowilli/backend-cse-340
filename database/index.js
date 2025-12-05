// database/index.js
const { Pool } = require("pg");

// Always load .env (Render doesn't load it automatically)
require("dotenv").config();

/*
  Decide which config to use:
  - If DATABASE_URL exists → we're on Render → use it with SSL
  - Otherwise → use individual PG_ variables (local dev)
*/
const pool = new Pool({
  // Priority 1: Render's DATABASE_URL (includes host, user, password, db, port)
  connectionString: process.env.DATABASE_URL || undefined,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }  // Required for Render
    : false,                         // Local = no SSL

  // Fallback for local development (only used if DATABASE_URL is missing)
  ...(process.env.DATABASE_URL ? {} : {
    user: process.env.PG_USER,
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT || 5432,
  }),
});

// Query helper
async function query(text, params) {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Query executed:", { text: text.substring(0, 50) + "...", duration, rows: res.rowCount });
    return res;
  } catch (err) {
    console.error("DB ERROR:", err.message || err);
    throw err;
  }
}

module.exports = { pool, query };

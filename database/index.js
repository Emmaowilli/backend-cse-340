// database/index.js
const { Pool } = require("pg");

// Load .env locally
if (!process.env.DATABASE_URL) {
  require("dotenv").config();
}

/*
  Detect local environment.
*/
const isLocal =
  process.env.PG_HOST === "localhost" ||
  process.env.PG_HOST === "127.0.0.1" ||
  process.env.LOCAL === "true";

// Local DB config (NO SSL)
const localConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: String(process.env.PG_PASSWORD || ""), 
  port: process.env.PG_PORT || 5432,
};

// Render/PostgreSQL config (WITH SSL)
const renderConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

// Create pool
const pool = new Pool(isLocal ? localConfig : renderConfig);

// Query helper
async function query(text, params) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error("DB ERROR:", err);
    throw err;
  }
}

// REQUIRED EXPORTS
module.exports = {
  pool,
  query,
};

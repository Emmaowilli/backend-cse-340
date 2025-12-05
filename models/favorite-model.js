const pool = require("../database/");

async function addFavorite(account_id, inv_id) {
  try {
    const sql = "INSERT INTO favorite (account_id, inv_id) VALUES ($1, $2) RETURNING favorite_id";
    return await pool.query(sql, [account_id, inv_id]);
  } catch (error) {
    return { error: "Vehicle already in favorites" };
  }
}

async function removeFavorite(account_id, inv_id) {
  const sql = "DELETE FROM favorite WHERE account_id = $1 AND inv_id = $2";
  return await pool.query(sql, [account_id, inv_id]);
}

async function getFavoritesByAccount(account_id) {
  const sql = `
    SELECT i.*, c.classification_name 
    FROM inventory i
    JOIN classification c ON i.classification_id = c.classification_id
    JOIN favorite f ON i.inv_id = f.inv_id
    WHERE f.account_id = $1
    ORDER BY f.created_at DESC
  `;
  const result = await pool.query(sql, [account_id]);
  return result.rows;
}

async function isFavorite(account_id, inv_id) {
  const sql = "SELECT 1 FROM favorite WHERE account_id = $1 AND inv_id = $2";
  const result = await pool.query(sql, [account_id, inv_id]);
  return result.rowCount > 0;
}

module.exports = { addFavorite, removeFavorite, getFavoritesByAccount, isFavorite };
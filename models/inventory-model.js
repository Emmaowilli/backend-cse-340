// models/inventory-model.js
const pool = require("../database/");

/** 
 * Get all classifications (used for nav)
 */
async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const data = await pool.query(sql);
    return data.rows;
  } catch (error) {
    console.error("getClassifications error:", error);
    throw error;
  }
}

/**
 * Get classification record by ID
 */
async function getClassificationById(classification_id) {
  try {
    const sql = `
      SELECT * FROM classification 
      WHERE classification_id = $1
    `;
    const data = await pool.query(sql, [classification_id]);
    return data.rows[0];
  } catch (error) {
    console.error("getClassificationById error:", error);
    throw error;
  }
}

/**
 * Get all vehicles in a classification
 */
async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT * FROM inventory
      WHERE classification_id = $1
      ORDER BY inv_make, inv_model
    `;
    const data = await pool.query(sql, [classification_id]);
    return data.rows;
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error);
    throw error;
  }
}

/**
 * Get a single vehicle by inv_id
 */
async function getVehicleById(invId) {
  try {
    const sql = `
      SELECT * FROM inventory 
      WHERE inv_id = $1
    `;
    const data = await pool.query(sql, [invId]);
    return data.rows[0];
  } catch (error) {
    console.error("getVehicleById error:", error);
    throw error;
  }
}

module.exports = {
  getClassifications,
  getClassificationById,
  getInventoryByClassificationId,
  getVehicleById
};

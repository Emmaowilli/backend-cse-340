// models/inventory-model.js
const pool = require("../database");

// ----- Get a single vehicle by inv_id -----
async function getVehicleById(inv_id) {
  try {
    const sql = "SELECT * FROM public.inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("getVehicleById error:", error);
    throw error;
  }
}

// ----- Get vehicles by classification_id -----
async function getVehiclesByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT i.*, c.classification_name 
      FROM public.inventory AS i
      JOIN public.classification AS c ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1
      ORDER BY i.inv_make, i.inv_model
    `;
    const data = await pool.query(sql, [classification_id]);
    return data.rows;
  } catch (error) {
    console.error("getVehiclesByClassificationId error:", error);
    throw error;
  }
}

// ----- EXPORT BOTH -----
module.exports = {
  getVehicleById,
  getVehiclesByClassificationId,
  // keep any other functions you already have here
};

const pool = require("../database/");

async function getClassifications() {
  try {
    const sql = `
      SELECT classification_id, classification_name
      FROM classification
      ORDER BY classification_id ASC
    `;
    const data = await pool.query(sql);
    return data.rows;
  } catch (error) {
    console.error("getClassifications error:", error);
    throw error;
  }
}

async function getClassificationById(classification_id) {
  try {
    const sql = `
      SELECT *
      FROM classification
      WHERE classification_id = $1
    `;
    const data = await pool.query(sql, [classification_id]);
    return data.rows[0];
  } catch (error) {
    console.error("getClassificationById error:", error);
    throw error;
  }
}

async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT *
      FROM inventory
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

async function getVehicleById(invId) {
  try {
    const sql = `
      SELECT *
      FROM inventory
      WHERE inv_id = $1
    `;
    const data = await pool.query(sql, [invId]);
    return data.rows[0];
  } catch (error) {
    console.error("getVehicleById error:", error);
    throw error;
  }
}

async function addClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING *
    `;
    const data = await pool.query(sql, [classification_name]);
    return data.rows[0];
  } catch (error) {
    console.error("addClassification error:", error);
    throw error;
  }
}

async function addInventory(
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql = `
      INSERT INTO inventory
      (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
       inv_price, inv_miles, inv_color, classification_id)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `;

    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    ]);

    return data.rows[0];
  } catch (error) {
    console.error("addInventory error:", error);
    throw error;
  }
}

module.exports = {
  getClassifications,
  getClassificationById,
  getInventoryByClassificationId,
  getVehicleById,
  addClassification,
  addInventory
};












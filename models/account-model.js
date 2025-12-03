// models/account-model.js

const pool = require("../database/");

/**************************************
 * REGISTER ACCOUNT
 **************************************/
async function registerAccount(firstname, lastname, email, password) {
  try {
    const sql = `
      INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(sql, [
      firstname,
      lastname,
      email,
      password,
    ]);

    return result.rows[0];

  } catch (error) {
    console.error("registerAccount error:", error);
    return null;
  }
}

/**************************************
 * GET ACCOUNT BY EMAIL — REQUIRED FOR LOGIN
 **************************************/
async function getAccountByEmail(email) {
  try {
    const sql = `
      SELECT * FROM account
      WHERE account_email = $1;
    `;

    const result = await pool.query(sql, [email]);

    return result.rows[0]; // returns undefined if no match

  } catch (error) {
    console.error("getAccountByEmail error:", error);
    throw error;
  }
}

/**************************************
 * EXPORT FUNCTIONS
 **************************************/
module.exports = {
  registerAccount,
  getAccountByEmail,
};



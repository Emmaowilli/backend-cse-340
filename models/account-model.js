const pool = require("../database/");

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
async function getAccountByEmail(email) {
  try {
    const sql = `
      SELECT * FROM account
      WHERE account_email = $1;
    `;

    const result = await pool.query(sql, [email]);

    return result.rows[0];

  } catch (error) {
    console.error("getAccountByEmail error:", error);
    throw error;
  }
}

module.exports = {
  registerAccount,
  getAccountByEmail,
};



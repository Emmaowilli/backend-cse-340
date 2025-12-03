// routes/accountRoute.js
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const validation = require("../utilities/account-validation");

// Login
router.get("/login", accountController.buildLogin);
router.post(
  "/login",
  validation.loginRules(),
  validation.checkLoginData,
  accountController.loginAccount
);

// Register
router.get("/register", accountController.buildRegister);
router.post(
  "/register",
  validation.registrationRules(),
  validation.checkRegData,
  accountController.registerAccount
);

// Account management
router.get("/manage", accountController.buildAccountManagement);

// Edit account info page
router.get("/update", accountController.buildUpdateAccount);

// Process update
router.post(
  "/update",
  validation.updateRules(),
  validation.checkUpdateData,
  accountController.updateAccount
);

// Logout
router.get("/logout", accountController.logout);

module.exports = router;



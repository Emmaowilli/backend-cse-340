const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const validation = require("../utilities/account-validation");

// ========== YOUR EXISTING ROUTES (UNCHANGED) ==========
router.get("/login", accountController.buildLogin);
router.post(
  "/login",
  validation.loginRules(),
  validation.checkLoginData,
  accountController.loginAccount
);

router.get("/register", accountController.buildRegister);
router.post(
  "/register",
  validation.registrationRules(),
  validation.checkRegData,
  accountController.registerAccount
);

router.get("/manage", accountController.buildAccountManagement);

router.get("/update", accountController.buildUpdateAccount);

router.post(
  "/update",
  validation.updateRules(),
  validation.checkUpdateData,
  accountController.updateAccount
);

router.get("/logout", accountController.logout);

// ========== NEW FAVORITES ROUTES (ADDED BELOW) ==========
const favoriteController = require("../controllers/favoriteController");

// Add to favorites
router.post("/favorite/add", favoriteController.addToFavorites);

// Remove from favorites (from detail page or list)
router.post("/favorite/remove/:inv_id", favoriteController.removeFromFavorites);

// View all favorites
router.get("/favorites", favoriteController.viewFavorites);

module.exports = router;



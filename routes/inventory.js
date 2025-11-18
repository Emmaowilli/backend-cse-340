const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");
const utilities = require("../utilities");

// ===============================
// Classification Route
// ===============================
router.get(
  "/classification/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// ===============================
// Vehicle Detail Route
// ===============================
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildDetail)
);

module.exports = router;

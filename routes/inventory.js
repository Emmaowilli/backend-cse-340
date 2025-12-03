// routes/inventory.js
const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

// Inventory management home
router.get("/", invController.buildManagement);

// Add Classification
router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);

// Add Inventory
router.get("/add-inventory", invController.buildAddInventory);
router.post("/add-inventory", invController.addInventory);

// Classification pages
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/classification/:classificationId", invController.buildByClassificationId);

// Vehicle detail
router.get("/detail/:invId", invController.buildDetail);

module.exports = router;














// routes/inventory.js
const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

// Management root for inventory - per video: /inv
router.get("/", invController.buildManagement);

// Add Classification
router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);

// Add Inventory
router.get("/add-inventory", invController.buildAddInventory);
router.post("/add-inventory", invController.addInventory);

// Classification pages (support both /type and /classification URL styles)
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/classification/:classificationId", invController.buildByClassificationId);

// Vehicle detail pages
router.get("/detail/:invId", invController.buildDetail);

module.exports = router;













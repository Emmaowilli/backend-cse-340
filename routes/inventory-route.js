// routes/inventoryRoute.js
const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

// Route pattern required by Week 3
router.get("/classification/:classificationId", invController.buildByClassificationId);

module.exports = router;

const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")
const validate = require("../utilities/inventory-validation")

// Inventory Management
router.get("/", invController.buildManagementView)

// Classification View
router.get("/classification/:classificationId", invController.buildByClassificationId)

// Vehicle Detail View
router.get("/detail/:invId", invController.buildDetailView)

// Add Classification
router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassification,
  invController.addClassification
)

// Add Inventory
router.get("/add-inventory", invController.buildAddInventory)
router.post(
  "/add-inventory",
  validate.inventoryRules(),
  validate.checkInventory,
  invController.addInventory
)

module.exports = router










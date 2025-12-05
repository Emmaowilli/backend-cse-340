const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")
const validate = require("../utilities/inventory-validation")

router.get("/", invController.buildManagementView)

router.get("/classification/:classificationId", invController.buildByClassificationId)

router.get("/detail/:invId", invController.buildDetailView)

router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassification,
  invController.addClassification
)

router.get("/add-inventory", invController.buildAddInventory)
router.post(
  "/add-inventory",
  validate.inventoryRules(),
  validate.checkInventory,
  invController.addInventory
)

module.exports = router










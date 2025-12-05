const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

router.get("/", invController.buildManagement);

router.get("/add-classification", invController.buildAddClassification);
router.post("/add-classification", invController.addClassification);

router.get("/add-inventory", invController.buildAddInventory);
router.post("/add-inventory", invController.addInventory);

router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/classification/:classificationId", invController.buildByClassificationId);

router.get("/detail/:invId", invController.buildDetail);

module.exports = router;














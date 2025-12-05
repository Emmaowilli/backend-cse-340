const { body, validationResult } = require("express-validator");
const utilities = require("../utilities/");
const invModel = require("../models/inventory-model");

const validate = {};

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .notEmpty()
      .withMessage("Please provide a classification name.")
      .matches(/^[A-Za-z ]+$/)
      .withMessage("Classification name may only contain letters and spaces.")
  ];
};

validate.checkClassification = async (req, res, next) => {
  const errors = validationResult(req);
  const nav = await utilities.getNav();

  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors,
      message: "Please correct the errors below.",
      formData: req.body
    });
  }

  next();
};

validate.inventoryRules = () => {
  return [
    body("inv_make").trim().notEmpty().withMessage("Make is required."),

    body("inv_model").trim().notEmpty().withMessage("Model is required."),

    body("inv_year")
      .trim()
      .isInt({ min: 1900, max: 2099 })
      .withMessage("Enter a valid vehicle year."),

    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Description is required."),

    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Image path is required."),

    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Thumbnail path is required."),

    body("inv_price")
      .trim()
      .isFloat({ min: 0 })
      .withMessage("Price must be a valid number."),

    body("inv_miles")
      .trim()
      .isInt({ min: 0 })
      .withMessage("Miles must be a non-negative number."),

    body("classification_id")
      .trim()
      .isInt()
      .withMessage("Please choose a valid classification.")
  ];
};

/* =====================================================
 * CHECK VEHICLE VALIDATION
 * ===================================================== */
validate.checkInventory = async (req, res, next) => {
  const errors = validationResult(req);
  const nav = await utilities.getNav();

  // Build the <select> dropdown correctly
  const classificationList = await utilities.buildClassificationList(
    req.body.classification_id
  );

  if (!errors.isEmpty()) {
    return res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      errors,
      message: "Please fix the form errors below.",
      classificationList, // FIXED NAME
      formData: req.body
    });
  }

  next();
};

module.exports = validate;

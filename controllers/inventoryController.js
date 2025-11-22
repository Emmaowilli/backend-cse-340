// controllers/inventoryController.js
const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

/* ================================
   BUILD CLASSIFICATION VIEW
================================ */
invCont.buildByClassificationId = async function (req, res) {
  try {
    const classification_id = parseInt(req.params.classificationId);

    if (isNaN(classification_id)) {
      return res.status(400).render("errors/error", {
        title: "Invalid Classification",
        message: "Classification ID must be a number."
      });
    }

    const vehicles = await invModel.getInventoryByClassificationId(classification_id);

    // Build grid
    const classificationGrid = utilities.buildClassificationGrid(vehicles);

    // Build nav
    const nav = utilities.getNav(await invModel.getClassifications());

    // Render page
    res.render("inventory/classification", {
      title: "Available Vehicles",
      nav,
      classificationGrid
    });

  } catch (error) {
    console.error("Inventory Controller Error:", error);

    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Something went wrong loading the classification."
    });
  }
};


/* ================================
   BUILD VEHICLE DETAIL VIEW
================================ */
invCont.buildDetail = async function (req, res) {
  try {
    const inv_id = parseInt(req.params.invId);

    if (isNaN(inv_id)) {
      return res.status(400).render("errors/error", {
        title: "Invalid Vehicle",
        message: "Vehicle ID must be numeric."
      });
    }

    // ✔ FIXED — correct function name
    const vehicle = await invModel.getVehicleById(inv_id);

    if (!vehicle) {
      return res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        message: "No vehicle exists with this ID."
      });
    }

    // Build vehicle HTML
    const detailsHTML = utilities.buildVehicleDetailHTML(vehicle);

    // Build nav
    const nav = utilities.getNav(await invModel.getClassifications());

    // Render page
    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      detailsHTML
    });

  } catch (error) {
    console.error("Vehicle Detail Error:", error);

    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error loading vehicle details."
    });
  }
};

module.exports = invCont;









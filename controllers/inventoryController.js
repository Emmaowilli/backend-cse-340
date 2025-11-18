const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

/* ================================
   Build Classification View
================================ */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classificationId = parseInt(req.params.classificationId);

    const vehicles = await inventoryModel.getVehiclesByClassificationId(
      classificationId
    );

    const nav = await utilities.getNav();

    // If no vehicles found
    if (!vehicles || vehicles.length === 0) {
      return res.status(404).render("errors/error", {
        title: "404 - Not Found",
        message: "No vehicles found for this classification.",
        nav,
      });
    }

    const className = vehicles[0].classification_name;
    const grid = await utilities.buildClassificationGrid(vehicles);

    res.render("inventory/classification", {
      title: `${className} Vehicles`,
      nav,
      grid,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

/* ================================
   Build Vehicle Detail View
================================ */
invCont.buildDetail = async function (req, res, next) {
  try {
    const invId = parseInt(req.params.inv_id);

    const vehicle = await inventoryModel.getVehicleById(invId);
    const nav = await utilities.getNav();

    if (!vehicle) {
      return res.status(404).render("errors/error", {
        title: "404 - Not Found",
        message: "Vehicle not found.",
        nav,
      });
    }

    const detail = await utilities.buildDetailView(vehicle);

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      detail,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = invCont;

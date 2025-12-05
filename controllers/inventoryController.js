const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invCont = {};

invCont.buildManagement = async function (req, res) {
  try {
    const classifications = await invModel.getClassifications();
    const nav = utilities.getNav(classifications);

    return res.render("inventory/management", {
      title: "Vehicle Management",
      nav,
      message: req.flash ? req.flash("notice") : null,
    });
  } catch (error) {
    console.error("Management View Error:", error);
    return res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Unable to load the management page.",
      nav: res.locals.nav,
    });
  }
};

invCont.buildAddClassification = async function (req, res) {
  try {
    const classifications = await invModel.getClassifications();
    const nav = utilities.getNav(classifications);

    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      message: null,
      formData: {},
    });
  } catch (error) {
    console.error("buildAddClassification Error:", error);
    return res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Unable to load the add-classification page.",
      nav: res.locals.nav,
    });
  }
};

invCont.addClassification = async function (req, res) {
  try {
    const classification_name = req.body?.classification_name?.trim() || "";

    const classifications = await invModel.getClassifications();
    const nav = utilities.getNav(classifications);

    const validName = /^[A-Za-z]+$/.test(classification_name);

    if (!validName) {
      return res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        message: "Please provide a valid name (letters only, no spaces).",
        formData: { classification_name },
      });
    }

    const addResult = await invModel.addClassification(classification_name);

    if (addResult) {
      req.flash?.("notice", "Classification successfully added.");
      return res.redirect("/inv");
    }

    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      message: "Adding classification failed.",
      formData: { classification_name },
    });

  } catch (error) {
    console.error("addClassification Error:", error);
    return res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error processing classification.",
      nav: res.locals.nav,
    });
  }
};

invCont.buildAddInventory = async function (req, res) {
  try {
    const classifications = await invModel.getClassifications();
    const nav = utilities.getNav(classifications);

    return res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      message: null,
      classifications,
      formData: {},
    });
  } catch (error) {
    console.error("buildAddInventory Error:", error);
    return res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Unable to load the add-inventory page.",
      nav: res.locals.nav,
    });
  }
};

invCont.addInventory = async function (req, res) {
  try {
    const formData = req.body || {};

    const {
      inv_make = "",
      inv_model = "",
      inv_year = "",
      inv_color = "",
      inv_description = "",
      inv_image = "",
      inv_thumbnail = "",
      inv_price = "",
      inv_miles = "",
      classification_id = "",
    } = formData;

    const classifications = await invModel.getClassifications();
    const nav = utilities.getNav(classifications);

    if (
      !inv_make.trim() ||
      !inv_model.trim() ||
      !inv_year ||
      !inv_color.trim() ||
      !inv_description.trim() ||
      !classification_id ||
      !inv_price ||
      !inv_miles
    ) {
      return res.render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        message: "Please fill in all required fields.",
        classifications,
        formData,
      });
    }

 
    if (!/^\d{4}$/.test(String(inv_year))) {
      return res.render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        message: "Year must be 4 digits.",
        classifications,
        formData,
      });
    }

    if (isNaN(inv_price) || isNaN(inv_miles)) {
      return res.render("inventory/add-inventory", {
        title: "Add New Vehicle",
        nav,
        message: "Price and Miles must be numbers.",
        classifications,
        formData,
      });
    }

    const finalImage = inv_image.trim() || "/images/vehicles/no-image.png";
    const finalThumbnail = inv_thumbnail.trim() || "/images/vehicles/no-image-tn.png";

    const addResult = await invModel.addInventory(
      inv_make.trim(),
      inv_model.trim(),
      Number(inv_year),
      inv_description.trim(),
      finalImage,
      finalThumbnail,
      Number(inv_price),
      Number(inv_miles),
      inv_color.trim(),
      Number(classification_id)
    );

    if (addResult) {
      req.flash?.("notice", "Vehicle successfully added.");
      return res.redirect("/inv");
    }

    return res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      message: "Adding vehicle failed.",
      classifications,
      formData,
    });

  } catch (error) {
    console.error("addInventory Error:", error);
    return res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error processing inventory.",
      nav: res.locals.nav,
    });
  }
};

/***************************************
 * CLASSIFICATION VIEW
 ****************************************/
invCont.buildByClassificationId = async function (req, res) {
  try {
    const classificationId = Number(req.params.classificationId);

    if (isNaN(classificationId)) {
      return res.status(400).render("errors/error", {
        title: "Invalid Category",
        message: "Classification ID must be a number.",
        nav: res.locals.nav,
      });
    }

    const vehicles = await invModel.getInventoryByClassificationId(classificationId);
    const classificationInfo = await invModel.getClassificationById(classificationId);

    const classifications = await invModel.getClassifications();
    const nav = utilities.getNav(classifications);

    const grid = utilities.buildClassificationGrid(vehicles);

    const title = classificationInfo
      ? `${classificationInfo.classification_name} Vehicles`
      : "Vehicles";

    return res.render("inventory/classification", {
      title,
      nav,
      classificationGrid: grid,
    });

  } catch (error) {
    console.error("Classification Error:", error);
    return res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error loading classification.",
      nav: res.locals.nav,
    });
  }
};

/***************************************
 * VEHICLE DETAIL VIEW
 ****************************************/
invCont.buildDetail = async function (req, res) {
  try {
    const inv_id = Number(req.params.invId);

    if (isNaN(inv_id)) {
      return res.status(400).render("errors/error", {
        title: "Invalid Vehicle",
        message: "Vehicle ID must be numeric.",
        nav: res.locals.nav,
      });
    }

    const vehicle = await invModel.getVehicleById(inv_id);

    if (!vehicle) {
      return res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        message: "No vehicle exists with this ID.",
        nav: res.locals.nav,
      });
    }

    const detailsHTML = utilities.buildVehicleDetailHTML(vehicle);

    const classifications = await invModel.getClassifications();
    const nav = utilities.getNav(classifications);

    return res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      detailsHTML,
    });

  } catch (error) {
    console.error("Vehicle Detail Error:", error);
    return res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error loading vehicle details.",
      nav: res.locals.nav,
    });
  }
};

module.exports = invCont;





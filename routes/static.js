// routes/static.js
const express = require("express");
const router = express.Router();
const path = require("path");

// Serve static files from "public" directory
router.use(express.static(path.join(__dirname, "../public")));

// Specific folders (optional but fine)
router.use("/css", express.static(path.join(__dirname, "../public/css")));
router.use("/js", express.static(path.join(__dirname, "../public/js")));
router.use("/images", express.static(path.join(__dirname, "../public/images")));

// Forced error route for testing
router.get("/error", (req, res, next) => {
  next(new Error("This is a forced error."));
});

module.exports = router;


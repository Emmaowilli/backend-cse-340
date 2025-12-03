// routes/error.js
const express = require("express");
const router = express.Router();

// Test error route
router.get("/cause-error", (req, res, next) => {
  const err = new Error("Intentional 500 error for testing.");
  err.status = 500;
  next(err);
});

module.exports = router;


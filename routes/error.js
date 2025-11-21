// routes/error.js
const express = require('express');
const router = express.Router();

// create a route that intentionally throws an error
router.get('/cause-error', (req, res, next) => {
  // throw will be caught by the global error handler
  const err = new Error('Intentional 500 error for testing.');
  err.status = 500;
  next(err);
});

module.exports = router;

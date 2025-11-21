const express = require('express');
const path = require('path');
const staticRouter = require('./routes/static');
const inventoryRouter = require('./routes/inventory');
const errorRouter = require('./routes/error');
const utilities = require('./utilities');
const invModel = require('./models/inventory-model');

const app = express();

// === CRITICAL: Use Render's PORT or fallback to 5500 ===
const PORT = process.env.PORT || 5500;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// === GLOBAL NAV MIDDLEWARE ===
app.use(async (req, res, next) => {
  try {
    const data = await invModel.getClassifications();
    res.locals.nav = utilities.getNav(data.rows);
    next();
  } catch (err) {
    next(err);
  }
});

// Static Files
app.use('/', staticRouter);

// Inventory Routes
app.use('/inv', inventoryRouter);

// Error Trigger Route
app.use('/', errorRouter);

// === HOME PAGE ===
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', nav: res.locals.nav });
});

// === REMOVE OLD HARDCODED NAVIGATION ROUTES ===
// They are no longer used because nav is now dynamic.

// === 404 Handler ===
app.use((req, res, next) => {
  next({ status: 404, message: 'Page not found' });
});

// === GLOBAL ERROR HANDLER ===
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Server Error';

  console.error(`Error ${status}:`, message);

  res.status(status).render('errors/error', {
    title: status === 404 ? '404 - Not Found' : '500 - Server Error',
    message,
    nav: res.locals.nav,
  });
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (process.env.PORT) {
    console.log('Deployed on Render: https://your-project.onrender.com');
  }
});

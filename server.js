const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require("cookie-parser");

const staticRouter = require('./routes/static');
const inventoryRouter = require('./routes/inventory');
const accountRoute = require("./routes/accountRoute");
// Removed: const errorRouter = require('./routes/error');  ← This was the problem!

const utilities = require('./utilities');
const invModel = require('./models/inventory-model');
const authUtil = require("./utilities/auth");

const app = express();

// === PORT ===
const PORT = process.env.PORT || 5500;

// === COOKIE PARSER ===
app.use(cookieParser());

// === AUTH CHECK (Must come BEFORE routes) ===
app.use(authUtil.checkAuth);

// === View Engine ===
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// === BODY PARSING ===
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// === SESSION MIDDLEWARE ===
app.use(
  session({
    secret: 'superSecretKey',
    resave: false,
    saveUninitialized: false,
  })
);

// === FLASH MIDDLEWARE ===
app.use(flash());

// === FLASH → RES.LOCALS ===
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// === GLOBAL NAV MIDDLEWARE ===
app.use(async (req, res, next) => {
  try {
    const data = await invModel.getClassifications();
    res.locals.nav = utilities.getNav(data);
    next();
  } catch (err) {
    next(err);
  }
});

// ======================================
//              ROUTES
// ======================================

// STATIC FILES (CSS, JS, images, etc.)
app.use('/', staticRouter);

// INVENTORY ROUTES
app.use('/inv', inventoryRouter);

// ACCOUNT ROUTES
app.use('/account', accountRoute);

// HOME PAGE — This is your real homepage
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home',
    nav: res.locals.nav 
  });
});

// OPTIONAL: Keep the intentional error route ONLY on this safe path
// (so you can still test 500 errors by visiting /cause-error manually)
app.get('/cause-error', (req, res, next) => {
  const err = new Error("Intentional 500 error for testing.");
  err.status = 500;
  next(err);
});

// ======================================
//              ERROR HANDLING
// ======================================

// 404 — Page not found
app.use((req, res, next) => {
  next({ status: 404, message: 'Page not found' });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Server Error';

  console.error(`Error ${status}:`, message);

  res.status(status).render('errors/error', {
    title: status === 404 ? '404 - Not Found' : '500 - Server Error',
    message,
    nav: res.locals.nav || [],  // fallback in case nav failed
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







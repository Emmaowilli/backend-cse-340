const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require("cookie-parser");

const staticRouter = require('./routes/static');
const inventoryRouter = require('./routes/inventory');
const accountRoute = require("./routes/accountRoute");

const utilities = require('./utilities');
const invModel = require('./models/inventory-model');
const authUtil = require("./utilities/auth");

const app = express();

const PORT = process.env.PORT || 5500;
app.use(cookieParser());
app.use(authUtil.checkAuth);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'superSecretKey',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
app.use(async (req, res, next) => {
  try {
    const data = await invModel.getClassifications();
    res.locals.nav = utilities.getNav(data);
    next();
  } catch (err) {
    next(err);
  }
});
app.use('/', staticRouter);
app.use('/inv', inventoryRouter);

app.use('/account', accountRoute);

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home',
    nav: res.locals.nav 
  });
});

app.get('/cause-error', (req, res, next) => {
  const err = new Error("Intentional 500 error for testing.");
  err.status = 500;
  next(err);
});

app.use((req, res, next) => {
  next({ status: 404, message: 'Page not found' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Server Error';

  console.error(`Error ${status}:`, message);

  res.status(status).render('errors/error', {
    title: status === 404 ? '404 - Not Found' : '500 - Server Error',
    message,
    nav: res.locals.nav || [], 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







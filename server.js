const express = require('express');
const path = require('path');
const staticRouter = require('./routes/static');
const inventoryRouter = require('./routes/inventory'); // Only once
const errorRouter = require('./routes/error');         // Only once

const app = express();

// === CRITICAL: Use Render's PORT or fallback to 5500 ===
const PORT = process.env.PORT || 5500;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files (CSS, images, etc.)
app.use('/', staticRouter);

// === MOUNT INVENTORY ROUTES ===
app.use('/inv', inventoryRouter);

// === MOUNT ERROR TRIGGER ROUTE ===
app.use('/', errorRouter);

// === INDEX ROUTE ===
app.get('/', (req, res) => {
  res.render('index', { title: 'Home'  });
});

// === NAVIGATION ROUTES (Working Links) ===
app.get('/custom', (req, res) => {
  res.send(`
    <style>
      body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2rem; text-align: center; }
      h1 { color: #2c3e50; }
      a { color: #1abc9c; text-decoration: none; font-weight: bold; }
    </style>
    <h1>Custom Vehicles</h1>
    <p><a href="/">Back to Home</a></p>
  `);
});

app.get('/sedan', (req, res) => {
  res.send(`
    <style>
      body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2rem; text-align: center; }
      h1 { color: #2c3e50; }
      a { color: #1abc9c; text-decoration: none; font-weight: bold; }
    </style>
    <h1>Sedan Vehicles</h1>
    <p><a href="/">Back to Home</a></p>
  `);
});

app.get('/suv', (req, res) => {
  res.send(`
    <style>
      body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2rem; text-align: center; }
      h1 { color: #2c3e50; }
      a { color: #1abc9c; text-decoration: none; font-weight: bold; }
    </style>
    <h1>SUV Vehicles</h1>
    <p><a href="/">Back to Home</a></p>
  `);
});

app.get('/truck', (req, res) => {
  res.send(`
    <style>
      body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2rem; text-align: center; }
      h1 { color: #2c3e50; }
      a { color: #1abc9c; text-decoration: none; font-weight: bold; }
    </style>
    <h1>Truck Vehicles</h1>
    <p><a href="/">Back to Home</a></p>
  `);
});

// === 404 Handler ===
app.use((req, res, next) => {
  next({ status: 404, message: "Page not found" });
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server Error";

  console.error(`Error ${status}:`, message);

  res.status(status).render("errors/error", {
    title: status === 404 ? "404 - Not Found" : "500 - Server Error",
    message,
    nav: req.nav || [],
  });
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (process.env.PORT) {
    console.log(`Deployed on Render: https://your-project.onrender.com`);
  }
});


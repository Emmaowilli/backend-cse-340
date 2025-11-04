const express = require('express');
const path = require('path');
const staticRouter = require('./routes/static');

const app = express();

// === CRITICAL: Use Render's PORT or fallback to 5500 ===
const PORT = process.env.PORT || 5500;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files (CSS, images, etc.)
app.use('/', staticRouter);

// === INDEX ROUTE ===
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
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

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (process.env.PORT) {
    console.log(`Deployed on Render: https://your-project.onrender.com`);
  }
});
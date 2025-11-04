const express = require('express');
const path = require('path');
const staticRouter = require('./routes/static');

const app = express();
const PORT = process.env.PORT || 5500;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use('/', staticRouter);

// Index Route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Navigation Routes (NOW WORKING)
app.get('/custom', (req, res) => {
  res.send(`
    <style>
      body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2rem; }
      h1 { text-align: center; color: #2c3e50; margin-top: 100px; }
      p { text-align: center; margin-top: 1rem; }
      a { color: #1abc9c; text-decoration: none; font-weight: bold; }
    </style>
    <h1>Custom Vehicles</h1>
    <p><a href="/">← Back to Home</a></p>
  `);
});

app.get('/sedan', (req, res) => {
  res.send(`
    <style>
      body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2rem; }
      h1 { text-align: center; color: #2c3e50; margin-top: 100px; }
      p { text-align: center; margin-top: 1rem; }
      a { color: #1abc9c; text-decoration: none; font-weight: bold; }
    </style>
    <h1>Sedan Vehicles</h1>
    <p><a href="/">← Back to Home</a></p>
  `);
});

app.get('/suv', (req, res) => {
  res.send(`
    <style>
      body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2rem; }
      h1 { text-align: center; color: #2c3e50; margin-top: 100px; }
      p { text-align: center; margin-top: 1rem; }
      a { color: #1abc9c; text-decoration: none; font-weight: bold; }
    </style>
    <h1>SUV Vehicles</h1>
    <p><a href="/">← Back to Home</a></p>
  `);
});

app.get('/truck', (req, res) => {
  res.send(`
    <style>
      body { font-family: Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 2rem; }
      h1 { text-align: center; color: #2c3e50; margin-top: 100px; }
      p { text-align: center; margin-top: 1rem; }
      a { color: #1abc9c; text-decoration: none; font-weight: bold; }
    </style>
    <h1>Truck Vehicles</h1>
    <p><a href="/">← Back to Home</a></p>
  `);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
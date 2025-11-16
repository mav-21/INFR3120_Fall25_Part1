// --- Imports
const express = require('express');   // express is the web framework we’re using
const path = require('path');         // handles file paths (used for views + static files)
const methodOverride = require('method-override');  // lets forms fake PUT/DELETE requests
const expressLayouts = require('express-ejs-layouts'); // adds layout support for EJS templates

// --- MongoDB
require('dotenv').config(); // load environment variables from .env
const mongoose = require('mongoose'); // MongoDB library

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });


  // --- App
const app = express(); // make the express app (always do this first)

// --- View engine + layouts
app.set('view engine', 'ejs');  // tells express we’re using ejs files
app.set('views', path.join(__dirname, 'views'));  // sets where the ejs files are stored
app.use(expressLayouts);  // turn on layout support so we can reuse layout.ejs
app.set('layout', 'layout');  // tells it to use layout.ejs by default

// --- Middleware
app.use(express.urlencoded({ extended: true }));  // lets us read form data from POST requests
app.use(methodOverride('_method'));  // adds support for PUT or DELETE in forms
app.use(express.static(path.join(__dirname, 'public')));  // serves CSS/images/JS from public folder

// --- In-memory "database"
let items = [  // just a fake db that stores stuff in memory for now
  { id: 1, name: 'Water Bottle', desc: 'Blue Nalgene', date: '2025-11-10', place: 'Library', type: 'Lost' }, // test item
];

// Utility to get next id
const nextId = () => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1);  // finds biggest id + 1 (or 1 if empty)

// --- Routes

// Landing page: hero + table
app.get('/', (req, res) => {  // main page route
  res.render('index', { items });  // loads index.ejs and passes the items array
});

// List page (optional separate)
app.get('/items', (req, res) => {  // second page for all items
  res.render('items', { items });  // loads items.ejs and gives it the list
});

// New item form
app.get('/items/new', (req, res) => {  // shows the form for adding new item
  res.render('new');  // loads new.ejs template
});

// Create item
app.post('/items', (req, res) => {  // handles when the form submits
  const { name, desc, date, place, type } = req.body;  // get data from form
  items.push({ id: nextId(), name, desc, date, place, type });  // add new item to array
  res.redirect('/');  // send user back to home page
});

// Edit form
app.get('/items/:id/edit', (req, res) => {  // page for editing a specific item
  const item = items.find(i => i.id === Number(req.params.id));  // find the item by id
  if (!item) return res.status(404).send('Not found');  // if not found, 404
  res.render('edit', { item });  // load edit.ejs with item data
});

// Update item
app.put('/items/:id', (req, res) => {  // when edit form gets submitted
  const id = Number(req.params.id);  // grab id from URL
  const idx = items.findIndex(i => i.id === id);  // find its index
  if (idx === -1) return res.status(404).send('Not found');  // handle invalid id
  const { name, desc, date, place, type } = req.body;  // get updated form data
  items[idx] = { id, name, desc, date, place, type };  // replace old item with new one
  res.redirect('/');  // go back to homepage
});

// Delete item
app.delete('/items/:id', (req, res) => {  // deletes an item by id
  items = items.filter(i => i.id !== Number(req.params.id));  // remove that item from array
  res.redirect('/');  // redirect home after deleting
});

// --- Start server
const PORT = process.env.PORT || 3000;  // use the port Render/Heroku gives or fallback to 3000
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));  // start the server and log it

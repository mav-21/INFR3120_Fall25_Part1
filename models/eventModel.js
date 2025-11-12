// models/eventModel.js
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');

// JSON database file
const db = new Low(new JSONFile('./data/listings.json'), { listings: [] });

// Get all listings
async function getAll() {
  await db.read();
  return db.data.listings;
}

// Create new listing
async function create(data) {
  await db.read();
  const newListing = {
    id: nanoid(6),
    title: data.title,
    description: data.description,
    date: data.date,
    location: data.location,
    status: data.status // "Lost" or "Found"
  };
  db.data.listings.push(newListing);
  await db.write();
  return newListing;
}

// Get listing by ID
async function getById(id) {
  await db.read();
  return db.data.listings.find(item => item.id === id);
}

// Update listing
async function update(id, updatedData) {
  await db.read();
  const index = db.data.listings.findIndex(item => item.id === id);
  if (index !== -1) {
    db.data.listings[index] = { id, ...updatedData };
    await db.write();
    return db.data.listings[index];
  }
  return null;
}

 // Delete listing
async function remove(id) {
  await db.read();
  db.data.listings = db.data.listings.filter(item => item.id !== id);
  await db.write();
}

module.exports = { getAll, create, getById, update, remove };

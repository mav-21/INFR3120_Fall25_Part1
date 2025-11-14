// models/eventModel.js
// ---------------------------------------------------
// simple CRUD operations using a placeholder array
// ---------------------------------------------------

// Placeholder array to hold events
let events = [
  {
    id: 1,
    title: 'Laptop Charger',
    date: '2025-11-20',
    time: '10:00 AM',
    description: 'A charger for a laptop found in the library.',
  },
];

// Used to generate the next unique ID
const nextId = () => (events.length ? Math.max(...events.map(e => e.id)) + 1 : 1);

// --- CRUD Functions ---

// CREATE a new event
function createEvent(title, date, time, description) {
  const newEvent = { id: nextId(), title, date, time, description };
  events.push(newEvent);
  return newEvent;
}

// READ all events
function getAllEvents() {
  return events;
}

// READ one event by title (case-insensitive)
function getEventByTitle(title) {
  return events.find(e => e.title.toLowerCase() === title.toLowerCase());
}

// UPDATE an existing event
function updateEvent(id, updatedData) {
  const idx = events.findIndex(e => e.id === Number(id));
  if (idx === -1) return null;
  events[idx] = { ...events[idx], ...updatedData, id: Number(id) };
  return events[idx];
}

// DELETE an event
function deleteEvent(id) {
  const before = events.length;
  events = events.filter(e => e.id !== Number(id));
  return events.length < before;
}

// --- Export all functions ---
module.exports = {
  createEvent,
  getAllEvents,
  getEventByTitle,
  updateEvent,
  deleteEvent,
};

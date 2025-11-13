const events = require('./eventModel');

console.log("----- INITIAL EVENTS -----");
console.log(events.getAllEvents());

// Create
console.log("\n----- CREATE EVENT -----");
const e1 = events.createEvent("Lost Laptop", "2025-11-30", "4:00 PM", "Black Dell laptop");
console.log(e1);

// Read (all)
console.log("\n----- AFTER CREATE -----");
console.log(events.getAllEvents());

// Read (single)
console.log("\n----- GET EVENT BY ID -----");
console.log(events.getEventById(e1.id));

// Update
console.log("\n----- UPDATE EVENT -----");
const updated = events.updateEvent(e1.id, {
  description: "Updated description: Black Dell laptop with stickers"
});
console.log(updated);

// Delete
console.log("\n----- DELETE EVENT -----");
console.log("Deleted?", events.deleteEvent(e1.id));

// Final state
console.log("\n----- FINAL EVENTS -----");
console.log(events.getAllEvents());

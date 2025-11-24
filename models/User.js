// models/User.js
const mongoose = require('mongoose');          // bring in mongoose ORM

const userSchema = new mongoose.Schema({       // define a user model
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema); // export the model

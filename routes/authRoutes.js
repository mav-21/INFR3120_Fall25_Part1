// file that handles all authentication-related routes
const express = require('express'); // imports Express to create routes
const router = express.Router(); // creates new router instance to group routes together
const controller = require('../controllers/authController'); // imports all auth functions (register, login, logout)

// register routes
router.get('/register', controller.showRegister); // when someone visits /register, show the register page
router.post('/register', controller.registerUser); // when the register form is submitted, run the register logic

// login routes
router.get('/login', controller.showLogin); // shows the login page to the user
router.post('/login', controller.loginUser); // checks login credentials and logs the user in

// logout route
router.get('/logout', controller.logoutUser); // logs the user out by destroying the session

module.exports = router; // exports the router so app.js can use it

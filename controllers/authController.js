// controllers/authController.js
const User = require('../models/User'); // bring in user model
const bcrypt = require('bcrypt'); // import hashing lib

// --- show register page
exports.showRegister = (req, res) => {
  res.render('auth/register'); // load register form
};

// --- handle register form
exports.registerUser = async (req, res) => {
  const { username, password } = req.body; // grab form inputs
  const hashedPassword = await bcrypt.hash(password, 10); // hash pass
  await User.create({ username, password: hashedPassword }); // save user
  res.redirect('/login'); // go to login page
};

// --- show login page
exports.showLogin = (req, res) => {
  res.render('auth/login'); // load login form
};

// --- handle login form
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') }); // Make username case-insensitive while still matching actual stored username
  if (!user) return res.send('User not found'); // handle bad username
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('Incorrect password'); // bad pass
  req.session.user = user; // store session
  res.redirect('/'); // redirect to home
};

// --- logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login'); // clear session
  });
};

const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Error during login', error: err.message });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Error logging in', error: err.message });
      res.json({ message: 'Logged in successfully', user });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Error during logout', error: err.message });
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this file exists
const bcrypt = require('bcrypt');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Korisnik već postoji.' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password || '123456', 10);

    // Create user
    const user = new User({ email, password: hashed, ...rest });
    await user.save();

    res.json({ message: 'Registracija uspješna.' });
  } catch (err) {
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

module.exports = router;

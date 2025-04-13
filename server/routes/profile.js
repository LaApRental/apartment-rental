// routes/profile.js
const express = require('express');
const router = express.Router();
const HostProfile = require('../models/HostProfile');

router.post('/', async (req, res) => {
  const { userId, firstName, lastName, photo, descriptions, translatedStatus } = req.body;

  try {
    const existing = await HostProfile.findOne({ userId });

    if (existing) {
      existing.firstName = firstName;
      existing.lastName = lastName;
      existing.photo = photo;
      existing.descriptions = descriptions;
      existing.translatedStatus = translatedStatus;
      await existing.save();
      return res.json({ success: true, message: 'Profile updated.' });
    }

    const newProfile = new HostProfile({
      userId,
      firstName,
      lastName,
      photo,
      descriptions,
      translatedStatus,
    });
    await newProfile.save();
    res.status(201).json({ success: true, message: 'Profile created.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

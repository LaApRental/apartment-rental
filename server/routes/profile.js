// routes/profile.js
const express = require('express');
const router = express.Router();
const HostProfile = require('../models/HostProfile');

router.post('/', async (req, res) => {
  const { userId, firstName, lastName, photo, descriptions, translatedStatus } = req.body;

  try {
    let profile = await HostProfile.findOne({ userId });

    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.photo = photo;
      profile.descriptions = descriptions;
      profile.translatedStatus = translatedStatus;
      await profile.save();
      return res.json({ success: true, message: 'Profil ažuriran.' });
    }

    profile = new HostProfile({
      userId,
      firstName,
      lastName,
      photo,
      descriptions,
      translatedStatus,
    });

    await profile.save();
    res.status(201).json({ success: true, message: 'Profil kreiran.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Greška na serveru.' });
  }
});

module.exports = router;


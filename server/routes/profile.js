// routes/profile.js
const express = require('express');
const router = express.Router();

      // Configure multer for image storage
      const storage = multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        }
      });

const upload = multer({ storage });
const HostProfile = require('../models/HostProfile');
const multer = require('multer');
const path = require('path');

// GET /api/profile?userId=...
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const profile = await HostProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ message: 'Profil nije pronađen.' });

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška na serveru.' });
  }
});


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


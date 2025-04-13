// routes/profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer'); // ✅ move this up
const path = require('path');
const HostProfile = require('../models/HostProfile');

// Configure multer for image storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ GET /api/profile
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

// ✅ POST (JSON version — fallback if needed)
router.post('/', async (req, res) => {
  console.log('🛠️ Received userId:', req.body.userId);
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


// ✅ NEW: POST /api/profile/upload — with real image upload!
router.post('/upload', upload.single('photo'), async (req, res) => {
  req.body = Object.fromEntries(Object.entries(req.body).map(([k, v]) => [k, v]));
  const { userId, firstName, lastName, descriptions, translatedStatus } = req.body;

  try {
    let profile = await HostProfile.findOne({ userId });

    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const parsedDescriptions = JSON.parse(descriptions || '{}');
    const parsedStatus = JSON.parse(translatedStatus || '{}');

    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      if (photoUrl) profile.photo = photoUrl;
      profile.descriptions = parsedDescriptions;
      profile.translatedStatus = parsedStatus;
      await profile.save();
      return res.json({ success: true, message: 'Profil ažuriran s fotografijom.' });
    }

    profile = new HostProfile({
      userId,
      firstName,
      lastName,
      photo: photoUrl,
      descriptions: parsedDescriptions,
      translatedStatus: parsedStatus,
    });

    await profile.save();
    res.status(201).json({ success: true, message: 'Profil kreiran s fotografijom.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Greška na serveru.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const HostProfile = require('../models/HostProfile');

// ✅ Multer config for saving files to /uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ POST /api/profile/upload
router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    // Parse text fields from multipart/form-data
    req.body = Object.fromEntries(Object.entries(req.body).map(([k, v]) => [k, v]));

    const { userId, firstName, lastName, descriptions, translatedStatus } = req.body;

    console.log('✅ Received userId:', userId);
    console.log('🧾 Other fields:', { firstName, lastName });
    console.log('🖼️ req.file:', req.file);

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Nedostaje userId.' });
    }

    let parsedDescriptions = {};
    let parsedStatus = {};

    try {
      parsedDescriptions = JSON.parse(descriptions || '{}');
      parsedStatus = JSON.parse(translatedStatus || '{}');
    } catch (parseErr) {
      console.error('❌ JSON parse error:', parseErr);
      return res.status(400).json({ success: false, message: 'Neispravan opis ili status.' });
    }

    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    let profile = await HostProfile.findOne({ userId });

    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      if (photoUrl) profile.photo = photoUrl;
      profile.descriptions = parsedDescriptions;
      profile.translatedStatus = parsedStatus;
      await profile.save();
      return res.json({ success: true, message: 'Profil ažuriran s fotografijom.' });
    }

    // Create new profile
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
    console.error('💥 Greška u spremanju profila:', err);
    res.status(500).json({ success: false, message: 'Greška na serveru.' });
  }
});

module.exports = router;

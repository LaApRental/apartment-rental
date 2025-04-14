const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const HostProfile = require('../models/HostProfile');

// ✅ Cloudinary setup
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Use Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'host-profiles',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });


// ✅ GET /api/profile?userId=...
router.get('/', async (req, res) => {
  const { userId } = req.query;
  console.log('📥 GET /profile called with userId:', userId);

  try {
    const profile = await HostProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ message: 'Profil nije pronađen.' });

    res.json(profile);
  } catch (err) {
    console.error('❌ GET profile error:', err);
    res.status(500).json({ message: 'Greška na serveru.' });
  }
});


// ✅ POST (JSON version fallback)
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
    console.error('❌ POST profile error:', err);
    res.status(500).json({ success: false, message: 'Greška na serveru.' });
  }
});


// ✅ POST /api/profile/upload — Cloudinary image upload version
router.post('/upload', upload.single('photo'), async (req, res) => {
  req.body = Object.fromEntries(Object.entries(req.body).map(([k, v]) => [k, v]));
  const { userId, firstName, lastName, descriptions, translatedStatus } = req.body;
  const photoUrl = req.file ? req.file.path : null; // ✅ Cloudinary returns the full URL

  try {
    let profile = await HostProfile.findOne({ userId });

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

    const newProfile = new HostProfile({
      userId,
      firstName,
      lastName,
      photo: photoUrl,
      descriptions: parsedDescriptions,
      translatedStatus: parsedStatus,
    });

    await newProfile.save();
    res.status(201).json({ success: true, message: 'Profil kreiran s fotografijom.' });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ success: false, message: 'Greška na serveru.' });
  }
});

module.exports = router;

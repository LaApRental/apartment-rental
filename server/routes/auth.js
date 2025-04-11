const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User');
const sendMail = require('../utils/sendMail'); // We’ll create this
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { email, ...rest } = req.body;

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Korisnik već postoji.' });
    }

    // Create activation token
    const token = crypto.randomBytes(32).toString('hex');

    const user = new User({
      email,
      ...rest,
      activated: false,
      activationToken: token,
      activationExpires: Date.now() + 1000 * 60 * 60 * 24 // 24h
    });

    await user.save();

    const activationLink = `https://hrvatska-apartmani.com/activate?token=${token}`;

    await sendMail(email, 'Aktivacija računa', `
      Pozdrav! Kliknite na poveznicu kako biste aktivirali račun i postavili lozinku:
      ${activationLink}
    `);

    res.json({ message: 'Aktivacijski link je poslan na e-mail.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

router.post('/activate', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Nedostaje token ili lozinka.' });
  }

  try {
    const user = await User.findOne({
      activationToken: token,
      activationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Token nije valjan ili je istekao.' });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.activated = true;
    user.activationToken = undefined;
    user.activationExpires = undefined;

    await user.save();

    res.json({ message: 'Račun je uspješno aktiviran.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const sendMail = require('../utils/sendMail');

// ✅ REGISTER USER
router.post('/register', async (req, res) => {
  try {
    const {
      ime, prezime, email, oib, nazivTvrtke,
      adresa, postanskiBroj, grad, mobilni, korisnikTip, fiksni
    } = req.body;

    // 🔐 Basic field checks
    if (
      !ime || !prezime || !email || !oib ||
      !adresa || !postanskiBroj || !grad || !mobilni
    ) {
      return res.status(400).json({ error: 'Molimo ispunite sva obavezna polja.' });
    }

    if (korisnikTip === 'pravne' && !nazivTvrtke) {
      return res.status(400).json({ error: 'Molimo unesite naziv tvrtke.' });
    }

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Korisnik već postoji.' });
    }

    // 🔐 Generate and hash password
    const plainPassword = crypto.randomBytes(6).toString('hex');
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({
      ime,
      prezime,
      email,
      oib,
      nazivTvrtke,
      adresa,
      postanskiBroj,
      grad,
      mobilni,
      fiksni,
      korisnikTip,
      password: hashedPassword,
      activated: true
    });

    await user.save();

    // ✉️ Send email with password
    const subject = 'Podaci za prijavu u korisničko sučelje';
    const body = `
Poštovanje ${ime} ${prezime},

Zahvaljujemo se na registraciji na Hrvatska-apartmani.com, te Vam šaljemo lozinku za pristup korisničkom sučelju.

Molimo Vas da za prvu prijavu koristite svoju e-mail adresu i dolje navedenu lozinku.

📧 E-mail: ${email}
🔒 Lozinka: ${plainPassword}

➡️ Prijava: https://hrvatska-apartmani.com/login

Korisnička podrška:
E: podrska@hrvatska-apartmani.com

Vaša Hrvatska-apartmani.com
    `;

    await sendMail(email, subject, body);

    res.json({ message: 'Registracija uspješna. Podaci za prijavu su poslani na e-mail.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

// ✅ LOGIN USER
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.activated) {
      return res.status(400).json({ error: 'Pogrešan e-mail ili račun nije aktiviran.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Pogrešna lozinka.' });
    }

    res.json({ message: 'Uspješna prijava!' });
  } catch (err) {
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

module.exports = router;

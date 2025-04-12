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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Login attempt:', email);

  try {
    const user = await User.findOne({ email });
        if (!user) {
          console.log('❌ User not found');
          return res.status(400).json({ error: 'Pogrešan e-mail ili lozinka.' });
        }

        if (!user.password) {
          console.log('❌ User has no password set');
          return res.status(400).json({ error: 'Račun nije ispravno kreiran. Kontaktirajte podršku.' });
        }
        
        const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('❌ Password mismatch');
      return res.status(400).json({ error: 'Pogrešna lozinka.' });
    }

    console.log('✅ Login success for', user.email);
    res.json({ message: 'Uspješna prijava!' });
  } catch (err) {
    console.error('💥 Server error in /login:', err);
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

module.exports = router;

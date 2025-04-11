const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const sendMail = require('../utils/sendMail');

// 📌 Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, ime, prezime, ...rest } = req.body;

    // Check for existing email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Korisnik već postoji.' });
    }

    // Generate random password
    const plainPassword = crypto.randomBytes(6).toString('hex');
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create and save user
    const user = new User({
      email,
      ime,
      prezime,
      password: hashedPassword,
      ...rest,
      activated: true
    });

    await user.save();

    // Prepare email
    const subject = 'Podaci za prijavu u korisničko sučelje';
    const body = `
Poštovanje ${ime} ${prezime},

Zahvaljujemo se na registraciji na Hrvatska-apartmani.com, te Vam šaljemo lozinku za pristup korisničkom sučelju.

Molimo Vas da za prvu prijavu koristite svoju e-mail adresu i dolje navedenu lozinku.
Lozinku i osobne podatke možete izmijeniti u bilo kojem trenutku unutar korisničkog sučelja.

📧 E-mail za prijavu: ${email}
🔒 Vaša lozinka: ${plainPassword}

➡️ Prijava: https://hrvatska-apartmani.com/login

Molimo pohranite ove podatke kako biste mogli pristupiti svom korisničkom računu.

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

// 📌 Login route (extend this as needed)
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

    // You can generate a JWT here or session if needed
    res.json({ message: 'Uspješna prijava!' });
  } catch (err) {
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

module.exports = router;

router.post('/register', async (req, res) => {
  try {
    const {
      ime, prezime, email, oib, nazivTvrtke,
      adresa, postanskiBroj, grad, mobilni, korisnikTip, ...rest
    } = req.body;

    // ✅ Required field check
    if (
      !ime || !prezime || !email || !oib ||
      !adresa || !postanskiBroj || !grad || !mobilni
    ) {
      return res.status(400).json({ error: 'Molimo ispunite sva obavezna polja.' });
    }

    // ✅ Additional check for 'pravne'
    if (korisnikTip === 'pravne' && !nazivTvrtke) {
      return res.status(400).json({ error: 'Molimo unesite naziv tvrtke.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Korisnik već postoji.' });
    }

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
      fiksni: rest.fiksni,
      korisnikTip,
      password: hashedPassword,
      activated: true
    });

    await user.save();

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

    res.json({ message: 'Registracija uspješna. Podaci su poslani na e-mail.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

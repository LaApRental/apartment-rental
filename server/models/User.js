const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ime: String,
  prezime: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // ✅ ADD THIS LINE
  oib: String,
  nazivTvrtke: String,
  adresa: String,
  postanskiBroj: String,
  grad: String,
  mobilni: String,
  fiksni: String,
  korisnikTip: String,
  activated: { type: Boolean, default: false },
  activationToken: String,
  activationExpires: Date
});

module.exports = mongoose.model('User', userSchema);

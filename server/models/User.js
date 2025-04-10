const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  ime: String,
  prezime: String,
  oib: String,
  nazivTvrtke: String,
  adresa: String,
  postanskiBroj: String,
  grad: String,
  mobitel: String,
  fiksni: String,
  korisnikTip: String,
  role: { type: String, default: 'user' }
});
module.exports = mongoose.model('User', userSchema);

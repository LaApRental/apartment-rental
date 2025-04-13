// models/HostProfile.js
const mongoose = require('mongoose');

const HostProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  firstName: String,
  lastName: String,
  photo: String, // can be a URL or file name
  descriptions: { type: Map, of: String },
  translatedStatus: { type: Map, of: String },
}, { timestamps: true });

module.exports = mongoose.model('HostProfile', HostProfileSchema);

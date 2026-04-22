const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Needs, Property Types, Industries
  subItems: [{
    name: String,
    link: String // for frontend navigation
  }],
  image: String // optional, for image URL
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);

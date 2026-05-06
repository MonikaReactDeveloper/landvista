const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  category: { type: String, required: true }, // e.g., For Lease, For Sale
  subItems: [{
    name: String,
    link: String
  }],
  image: String // optional promo image
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
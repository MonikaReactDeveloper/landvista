const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },

  subtitle: { type: String, default: "" },
  description: { type: String, required: true },
  detail: { type: String, default: "" },
  capabilities: [{
    title: String,
    subtitle: String,
    description: String
  }],
  category: { type: String, default: "General" }, // Keep for categorization if needed
  image: String
}, { timestamps: true });


module.exports = mongoose.model('Service', ServiceSchema);

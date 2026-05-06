const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },

  subtitle: { type: String, default: "" },
  description: { type: String, required: true },
  detail: { type: String, default: "" },
  brief: [{
    title: String,
    subtitle: String,
    description: String
  }],
  category: { type: String, default: "General" },
  image: String
}, { timestamps: true });


module.exports = mongoose.model('Insight', InsightSchema);

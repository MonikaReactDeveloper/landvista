const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Latest Research, Trending Topics, Featured Insights
  subItems: [{
    name: String,
    link: String // for frontend navigation
  }],
  image: String // optional, for image URL
}, { timestamps: true });

module.exports = mongoose.model('Insight', InsightSchema);

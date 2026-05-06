const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  trend: { type: String, enum: ["up", "down", "stable"], default: "stable" },
  status: { type: String, enum: ["positive", "negative", "neutral"], default: "neutral" }
});

const riskSchema = new mongoose.Schema({
  level: { type: String, enum: ["low", "medium", "high", "critical"], required: true },
  description: { type: String, required: true },
  impact: { type: String, default: "" }
});

const intelligenceHubSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, required: true }, // e.g. "Market", "Regulatory", "Economic"
    region: { type: String, default: "Global" },
    sector: { type: String, default: "Real Estate" },
    confidenceScore: { type: Number, min: 0, max: 100, default: 80 },
    signals: [signalSchema],
    risks: [riskSchema],
    isActive: { type: Boolean, default: true },
    tags: [{ type: String }],
    lastUpdated: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const IntelligenceHub = mongoose.model("IntelligenceHub", intelligenceHubSchema);

module.exports = IntelligenceHub;

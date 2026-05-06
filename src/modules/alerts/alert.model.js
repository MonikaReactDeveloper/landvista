const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["Policy", "Signal", "System", "Security"], 
      default: "System" 
    },
    priority: { 
      type: String, 
      enum: ["Low", "Medium", "High", "Critical"], 
      default: "Low" 
    },
    triggerRule: { type: String }, // Logic to trigger
    audience: { 
      type: String, 
      enum: [
        "All", 
        "Investors", 
        "All Investors", 
        "Institutional (Tier 3+)", 
        "Pipeline Only", 
        "Admins Only"
      ], 
      default: "All" 
    },
    channel: { 
      type: [String], 
      enum: ["Web", "Email", "SMS", "Push"], 
      default: ["Web"] 
    },
    message: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: { type: String, enum: ["Draft", "Active", "Paused", "Expired"], default: "Draft" },
    sentCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Alert || mongoose.model("Alert", alertSchema);


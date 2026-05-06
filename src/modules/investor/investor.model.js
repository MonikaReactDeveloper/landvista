const mongoose = require("mongoose");

// ─── Investor Activity Schema ────────────────────────────────────────────────
const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true }, // e.g., "Logged In", "Viewed Property"
    details: { type: String, default: "" },
  },
  { timestamps: true }
);

// ─── Investor Alert Schema ───────────────────────────────────────────────────
const alertSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "warning", "success"], default: "info" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ─── Investor Document Schema ────────────────────────────────────────────────
const documentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

const Activity = mongoose.model("InvestorActivity", activitySchema);
const Alert    = mongoose.model("InvestorAlert",    alertSchema);
const Document = mongoose.model("InvestorDocument", documentSchema);

module.exports = { Activity, Alert, Document };

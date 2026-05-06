const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  action: { type: String, required: true },
  details: { type: String },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now }
});

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now }
});

const mandateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    investor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    organization: { type: String },
    stage: { 
      type: String, 
      enum: ["Conversation", "Qualified", "Serious", "Mandate", "Closed", "Dropped"], 
      default: "Conversation" 
    },
    dealScore: { type: Number, min: 0, max: 100, default: 0 },
    dealGrade: { type: String, enum: ["A", "B", "C"], default: "C" }, // New field for A/B/C scoring
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    expectedValue: { type: Number },
    expectedClosingDate: { type: Date },
    lastFollowUpDate: { type: Date },
    nextFollowUpDate: { type: Date },
    slaStatus: { type: String, enum: ["On Track", "Delayed", "Breached"], default: "On Track" },
    dropOffReason: { type: String },
    founderOverride: { type: Boolean, default: false }, // New field
    notes: { type: String },
    status: { type: String, enum: ["Active", "Dropped", "Completed"], default: "Active" },
    relatedZones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Zone" }],
    relatedSectors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sector" }],
    activity: [activitySchema],
    documents: [documentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.models.Mandate || mongoose.model("Mandate", mandateSchema);


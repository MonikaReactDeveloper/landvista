const mongoose = require("mongoose");

const intelligenceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    type: { type: String, required: true }, // e.g. "Signal", "Trend", "Report"
    zone: { type: String, required: true },
    sector: { type: String, required: true },
    summary: { type: String, required: true },
    sourceName: { type: String, required: true },
    sourceUrl: { type: String },
    sourceFile: { type: String }, // For uploaded files
    riskScore: { type: Number, min: 1, max: 5, default: 1 },
    confidenceScore: { type: Number, min: 1, max: 5, default: 1 },
    signalType: { type: String }, // e.g. "Early Warning", "Market Shift"
    trendDirection: { type: String }, // e.g. "Upward", "Stable", "Declining"
    narrative: { type: String },
    decisionFlag: { type: String }, // e.g. "Action Required", "Monitor"
    status: {
      type: String,
      enum: ["Draft", "Review", "Published", "Archived"],
      default: "Draft"
    },
    reviewer: { type: String },
    internalNotes: { type: String },
    createdBy: { type: String, default: "System Admin" },
    lastUpdatedBy: { type: String },
    contradictionFlag: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
    versionHistory: [
      {
        version: Number,
        changes: String,
        updatedAt: { type: Date, default: Date.now },
        updatedBy: String
      }
    ]
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

intelligenceSchema.pre("save", function() {
  if (this.isModified("title")) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
});

intelligenceSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

const Intelligence = mongoose.models.Intelligence || mongoose.model("Intelligence", intelligenceSchema);


module.exports = Intelligence;


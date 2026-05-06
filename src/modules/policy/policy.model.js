const mongoose = require("mongoose");
const Counter = require("../common/counter.model");

const Zone = require("../zones/zone.model");
const Sector = require("../zones/sector.model");

// ─── Policy Document Schema ───────────────────────────────────────────────────
const policyDocumentSchema = new mongoose.Schema(
  {
    id:          { type: Number, unique: true },
    title:       { type: String, required: true },   // e.g. "Land Use Policy 2024"
    description: { type: String, default: "" },
    category:    { type: String, default: "" },      // e.g. "Land Use", "Environment"
    fileUrl:     { type: String, default: "" },      // URL to PDF or document
    publishedAt: { type: Date, default: Date.now },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Auto-increment hook
policyDocumentSchema.pre("save", async function() {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { modelName: "PolicyDocument" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
});

// ─── Policy Update Schema ─────────────────────────────────────────────────────
const policyUpdateSchema = new mongoose.Schema(
  {
    id:          { type: Number, unique: true },
    title:       { type: String, required: true },   // e.g. "New Zoning Regulations"
    summary:     { type: String, default: "" },
    content:     { type: String, default: "" },
    category:    { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Auto-increment hook
policyUpdateSchema.pre("save", async function() {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { modelName: "PolicyUpdate" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
});

const PolicyDocument = mongoose.models.PolicyDocument || mongoose.model("PolicyDocument", policyDocumentSchema);
const PolicyUpdate   = mongoose.models.PolicyUpdate   || mongoose.model("PolicyUpdate",   policyUpdateSchema);


module.exports = { Zone, Sector, PolicyDocument, PolicyUpdate };

const mongoose = require("mongoose");
const Counter = require("../common/counter.model");

// ─── Advisory Page Schema ─────────────────────────────────────────────────────
const advisorySchema = new mongoose.Schema(
  {
    id:          { type: Number, unique: true },     // Numeric ID: 1, 2, 3...
    title:       { type: String, required: true },   // e.g. "Expert Advisory Services"
    subtitle:    { type: String, default: "" },      // short tagline
    description: { type: String, default: "" },      // long description
    slug:        { type: String, unique: true },
    categories:  [{
      title: String,
      slug: String,
      subtitle: String,
      description: String
    }],
    bannerImageUrl: { type: String, default: "" },   // hero/banner image URL
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);


// Auto-increment hook & slugify
advisorySchema.pre("save", async function() {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { modelName: "Advisory" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  // Slugify categories
  if (this.categories) {
    this.categories.forEach(cat => {
      if (cat.title && !cat.slug) {
        cat.slug = cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    });
  }
});

// ─── Advisory Service Schema ──────────────────────────────────────────────────
const advisoryServiceSchema = new mongoose.Schema(
  {
    id:          { type: Number, unique: true },     // Numeric ID: 1, 2, 3...
    name:        { type: String, required: true },   // e.g. "Cybersecurity Assessment"
    description: { type: String, default: "" },
    category:    { type: String, required: true },   // e.g. "Security"
    iconUrl:     { type: String, default: "" },      // image URL
    price:       { type: Number, default: 0 },       // e.g. 8000
    duration:    { type: String, default: "" },      // e.g. "2 weeks"
    status:      { type: String, default: "active" }, // "active" | "inactive"
    order:       { type: Number, default: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Auto-increment hook
advisoryServiceSchema.pre("save", async function() {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { modelName: "AdvisoryService" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
});

// ─── Service Category Schema ──────────────────────────────────────────────────
const serviceCategorySchema = new mongoose.Schema(
  {
    id:          { type: Number, unique: true },     // Numeric ID: 1, 2, 3...
    name:        { type: String, required: true },   // e.g. "Legal", "Financial"
    description: { type: String, default: "" },
    iconUrl:     { type: String, default: "" },      // image URL
    order:       { type: Number, default: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Auto-increment hook
serviceCategorySchema.pre("save", async function() {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { modelName: "ServiceCategory" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
});

const Advisory        = mongoose.models.Advisory        || mongoose.model("Advisory",        advisorySchema);
const AdvisoryService = mongoose.models.AdvisoryService || mongoose.model("AdvisoryService", advisoryServiceSchema);
const ServiceCategory = mongoose.models.ServiceCategory || mongoose.model("ServiceCategory", serviceCategorySchema);


module.exports = { Advisory, AdvisoryService, ServiceCategory };

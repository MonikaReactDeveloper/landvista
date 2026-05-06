const mongoose = require("mongoose");

// ─── Trust Metrics Schema ─────────────────────────────────────────────────────
const trustMetricSchema = new mongoose.Schema(
  {
    label:       { type: String, required: true },   // e.g. "Security Score"
    value:       { type: String, required: true },   // e.g. "85" or "500+"
    description: { type: String, default: "" },      // e.g. "Measures controlled access..."
    iconUrl:     { type: String, default: "" },      // uploaded image path
    order:       { type: Number, default: 0 },       // display order
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ─── Site Settings Schema ─────────────────────────────────────────────────────
const siteSettingsSchema = new mongoose.Schema(
  {
    siteName:     { type: String, default: "LandVista" },
    logoUrl:      { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    address:      { type: String, default: "" },
    socialLinks: {
      facebook:  { type: String, default: "" },
      twitter:   { type: String, default: "" },
      linkedin:  { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    heroTitle:    { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroImageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const TrustMetric  = mongoose.model("TrustMetric",  trustMetricSchema);
const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

module.exports = { TrustMetric, SiteSettings };

const mongoose = require("mongoose");

const requestAccessPageSchema = new mongoose.Schema(
  {
    hero: {
      headline: { type: String, default: "Request Access to Institutional Land Intelligence" },
      subheadline: { type: String, default: "Qualification-based entry into a governance-led, NDA-controlled intelligence platform designed for institutional capital." },
      supporting_line: { type: String, default: "Access is reviewed, validated, and approved — not granted automatically. Entry is governed, not open." },
      cta_primary: { type: String, default: "Apply for Access" },
      cta_secondary: { type: String, default: "Begin Qualification" },
    },
    philosophy: {
      title: { type: String, default: "Controlled Entry. Governed Participation." },
      description: { type: String, default: "Access to the platform is not open." },
      points: [{ type: String }],
    },
    eligibleUsers: [
      {
        title: { type: String },
        description: { type: String },
        expectation: { type: String },
      },
    ],
    accessTiers: [
      {
        title: { type: String },
        benefits: { type: String },
        condition: { type: String },
      },
    ],
    processFlow: [
      {
        step_title: { type: String },
        description: { type: String },
      },
    ],
    ndaSection: {
      nda_required: { type: Boolean, default: true },
      nda_version: { type: String, default: "v1.0 Institutional" },
      acceptance_log: { type: Boolean, default: true },
    },
    privacySection: [{ type: String }],
    timelineSection: {
      review_time: { type: String, default: "24–72 hours" },
      decision_time: { type: String, default: "Within 5 business days" },
    },
    trustSection: [{ type: String }],
    limitations: [{ type: String }],
    finalCta: {
      headline: { type: String, default: "Enter a Governed Intelligence System" },
      supporting_line: { type: String, default: "Apply for qualification-based access to institutional land intelligence — validated, controlled, and decision-ready." },
      cta_primary: { type: String, default: "Apply for Access" },
      cta_secondary: { type: String, default: "Submit Application" },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RequestAccessPage", requestAccessPageSchema);

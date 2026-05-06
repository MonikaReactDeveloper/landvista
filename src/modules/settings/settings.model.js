const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    sla: {
      pipeline: { type: Number, default: 24 },
      approval: { type: Number, default: 12 },
    },
    tiers: [
      {
        name: { type: String, required: true },
        access: { type: String, default: "Restricted" },
      },
    ],
    alerts: {
      sla: { type: Boolean, default: true },
      nda: { type: Boolean, default: true },
      access: { type: Boolean, default: true },
    },
    emailTemplates: {
      nda: { type: String, default: "Please accept NDA to continue." },
      approval: { type: String, default: "Your access has been approved." },
      welcome: { type: String, default: "Welcome to LandVista Intelligence." },
    },
    system: {
      maintenance: { type: Boolean, default: false },
      registrations: { type: Boolean, default: true },
    },
    updatedBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

// Singleton Pattern: We only ever want ONE settings document
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;

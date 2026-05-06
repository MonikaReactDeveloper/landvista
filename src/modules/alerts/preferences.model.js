const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, unique: true },
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    marketingEmails: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const NotificationPreference = mongoose.model("NotificationPreference", preferenceSchema);

module.exports = NotificationPreference;

const mongoose = require("mongoose");

const notificationConfigSchema = new mongoose.Schema(
  {
    event: { 
      type: String, 
      required: true, 
      unique: true,
      enum: ["SLA_BREACH", "NDA_PENDING", "ACCESS_APPROVAL", "DOCUMENT_ACCESS", "CRITICAL_ERROR"]
    },
    emailEnabled: { type: Boolean, default: true },
    inAppEnabled: { type: Boolean, default: true },
    minSeverity: { 
      type: String, 
      enum: ["Low", "Medium", "High", "Critical"], 
      default: "Low" 
    },
    recipients: [{ type: String }] // List of roles or specific emails
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotificationConfig", notificationConfigSchema);

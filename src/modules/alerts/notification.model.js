const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    alertId: { type: mongoose.Schema.Types.ObjectId, ref: "Alert" }, // Reference to the campaign
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "Personalized" },
    isRead: { type: Boolean, default: false },
    metadata: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

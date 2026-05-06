const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., "Viewed", "Downloaded", "Watermarked"
  user: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String, default: "0.0.0.0" }
});

const vaultSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: "application/pdf" },
    fileSize: { type: String, default: "0 KB" },
    accessTier: { 
      type: String, 
      enum: ["Tier 1", "Tier 2", "Tier 3", "Tier 4"], 
      default: "Tier 3" 
    },
    restrictedToMandate: { type: mongoose.Schema.Types.ObjectId, ref: "Mandate" },
    allowedRoles: [{ type: String }],
    restrictedToUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isWatermarked: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    auditTrail: [auditSchema]

  },
  { timestamps: true }
);

const VaultDocument = mongoose.models.VaultDocument || mongoose.model("VaultDocument", vaultSchema);


module.exports = VaultDocument;

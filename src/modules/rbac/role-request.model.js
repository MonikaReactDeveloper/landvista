const mongoose = require("mongoose");

const roleRequestSchema = new mongoose.Schema(
  {
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requestedRole: { type: String, required: true },
    requestedTier: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reason: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.RoleRequest || mongoose.model("RoleRequest", roleRequestSchema);

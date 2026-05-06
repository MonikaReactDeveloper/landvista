const mongoose = require("mongoose");

const approvalRequestSchema = new mongoose.Schema(
  {
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { 
      type: String, 
      required: true,
      enum: ["DELETE_DATA", "CHANGE_ROLE", "FOUNDER_OVERRIDE", "PUBLISH_RISK_INTEL"] 
    },
    module: { type: String, required: true },
    payload: { type: mongoose.Schema.Types.Mixed, required: true }, // The data to be executed
    status: { 
      type: String, 
      enum: ["Pending", "Approved", "Rejected", "Executed"], 
      default: "Pending" 
    },
    reason: { type: String },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) } // 24h expiry
  },
  { timestamps: true }
);

module.exports = mongoose.models.ApprovalRequest || mongoose.model("ApprovalRequest", approvalRequestSchema);

const mongoose = require("mongoose");

const accessRequestSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    requestType: { type: String, enum: ["NDA_BYPASS", "ADMIN_ROLE", "DOC_ACCESS", "PROPERTY_EXPORT"], required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    reason: { type: String, default: "" },
    requestedAt: { type: Date, default: Date.now },
    processedBy: { type: String, default: null },
    processedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

const AccessRequest = mongoose.model("AccessRequest", accessRequestSchema);

module.exports = AccessRequest;

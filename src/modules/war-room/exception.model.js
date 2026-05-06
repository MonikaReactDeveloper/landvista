const mongoose = require("mongoose");

const systemExceptionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g., "AUTH_FAILURE", "RATE_LIMIT", "SECURITY_BREACH"
    message: { type: String, required: true },
    severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
    metadata: { type: Object, default: {} },
    isResolved: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const SystemException = mongoose.model("SystemException", systemExceptionSchema);

module.exports = SystemException;

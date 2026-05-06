const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userEmail: { type: String },
    role: { type: String },
    action: { type: String, required: true }, // e.g., "CREATE", "UPDATE", "APPROVE"
    module: { type: String, required: true }, // e.g., "GEOGRAPHY", "USERS", "INTELLIGENCE"
    beforeValue: { type: mongoose.Schema.Types.Mixed },
    afterValue: { type: mongoose.Schema.Types.Mixed },
    details: { type: String, default: "" },
    ipAddress: { type: String, default: "0.0.0.0" },
    device: { type: String },
    severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Low" },
    status: { type: String, enum: ["success", "failure"], default: "success" }

  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;

const mongoose = require("mongoose");

const alertLogSchema = new mongoose.Schema(
  {
    category: { 
      type: String, 
      enum: ["SLA", "NDA", "Access", "System", "Document", "Security"], 
      required: true 
    },
    severity: { 
      type: String, 
      enum: ["Info", "Warning", "Critical"], 
      default: "Info" 
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed }, // Reference to mandateId, userId, etc.
    status: { 
      type: String, 
      enum: ["Active", "Acknowledged", "Resolved"], 
      default: "Active" 
    },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolvedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.models.AlertLog || mongoose.model("AlertLog", alertLogSchema);

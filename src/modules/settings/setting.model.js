const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    category: { 
      type: String, 
      enum: ["GENERAL", "SECURITY", "NOTIFICATION", "INTEGRATION"], 
      default: "GENERAL" 
    },
    description: { type: String },
    editableBy: { type: String, default: "admin" },
    status: { type: String, enum: ["Active", "Disabled"], default: "Active" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Setting || mongoose.model("Setting", settingSchema);


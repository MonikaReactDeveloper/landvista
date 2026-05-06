const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    tier: { type: String, enum: ["Tier 0", "Tier 1", "Tier 2", "Tier 3", "Tier 4"], default: "Tier 1" },
    allowedModules: [{ type: String }],
    allowedActions: [{ type: String }], 
    routePermissions: [{ type: String }],
    isActive: { type: Boolean, default: true }

  },
  { timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

module.exports = Role;

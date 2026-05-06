const mongoose = require("mongoose");

const ndaAcceptanceSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    ndaVersion: { type: String, required: true },
    acceptedAt: { type: Date, default: Date.now },
    ipAddress: { type: String, default: "0.0.0.0" },
    userAgent: { type: String, default: "" }
  },
  { timestamps: true }
);

const NDAAcceptance = mongoose.model("NDAAcceptance", ndaAcceptanceSchema);

module.exports = NDAAcceptance;

const mongoose = require("mongoose");

const ndaSchema = new mongoose.Schema(
  {
    version: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String },
    fileUrl: { type: String },
    effectiveDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    reAcceptanceRequired: { type: Boolean, default: false },
    status: { type: String, enum: ["Active", "Archived"], default: "Active" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

  },
  { timestamps: true }
);

const NDA = mongoose.models.NDA || mongoose.model("NDA", ndaSchema);


module.exports = NDA;

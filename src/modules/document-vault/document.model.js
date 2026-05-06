const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { 
      type: String, 
      enum: ["Legal", "Technical", "Financial", "Marketing", "Other"], 
      default: "Technical" 
    },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
    sector: { type: mongoose.Schema.Types.ObjectId, ref: "Sector" },
    mandate: { type: String }, // Reference to a mandate ID
    accessTier: { 
      type: String, 
      enum: ["Preview", "Intelligence", "Mandate"], 
      default: "Preview" 
    },
    confidentialityLevel: { 
      type: String, 
      enum: ["Public", "Internal", "Confidential", "Strictly Confidential"], 
      default: "Internal" 
    },
    version: { type: String, default: "1.0.0" },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number },
    fileExtension: { type: String },
    watermarkRequired: { type: Boolean, default: true },
    downloadAllowed: { type: Boolean, default: false },
    expiryDate: { type: Date },
    status: { type: String, enum: ["Active", "Archived"], default: "Active" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalViews: { type: Number, default: 0 },
    lastAccessedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Document || mongoose.model("Document", documentSchema);


const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String },
    code: { type: String, required: true, uppercase: true },
    description: { type: String, default: "" },
    zone: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Zone", 
      required: true 
    },
    participationPercentage: { type: Number, default: 0 },
    activationStatus: { 
      type: String, 
      enum: ["Active", "Inactive", "Planned"], 
      default: "Active" 
    },
    riskLevel: { type: Number, min: 1, max: 5, default: 3 },
    confidenceLevel: { type: Number, min: 1, max: 5, default: 3 },
    sourceReference: { type: String },
    mapImageUrl: { type: String, default: "" },
    status: { 
      type: String, 
      enum: ["Active", "Archived"], 
      default: "Active" 
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

sectorSchema.pre("save", function() {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
});

sectorSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure code is searchable within a zone
sectorSchema.index({ code: 1, zone: 1 });

module.exports = mongoose.models.Sector || mongoose.model("Sector", sectorSchema);


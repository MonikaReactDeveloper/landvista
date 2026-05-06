const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String },
    location: { type: String, default: "" },
    area: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
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

zoneSchema.pre("save", function() {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
});

zoneSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.models.Zone || mongoose.model("Zone", zoneSchema);


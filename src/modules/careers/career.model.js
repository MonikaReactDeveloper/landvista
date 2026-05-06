const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true }, // e.g., "Research", "Technology", "Operations"
    location: { type: String, default: "Remote / Mumbai" },
    type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Internship"], default: "Full-time" },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    experience: { type: String, default: "0-2 years" },
    isActive: { type: Boolean, default: true },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", careerSchema);

module.exports = Career;

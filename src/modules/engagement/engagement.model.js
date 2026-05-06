const mongoose = require("mongoose");

const engagementSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  organization: { type: String, required: true },
  role: { type: String, required: true },
  investorType: { type: String, required: true },
  ticketSize: { type: String, required: true },
  interestArea: [{ type: String }],
  purpose: { type: String, required: true },
  timeline: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "reviewed", "approved", "rejected"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Engagement", engagementSchema);

const mongoose = require("mongoose");

const slaConfigSchema = new mongoose.Schema({
  entity_type: { 
    type: String, 
    required: true, 
    unique: true 
  }, // e.g. "Deal", "Task", "AccessRequest", "NDA", "DocumentReview"
  
  duration_hours: { type: Number, required: true, default: 24 },
  
  warning_percent: { type: Number, default: 70 },
  critical_percent: { type: Number, default: 90 },
  
  escalation_rules: [{
    hours_after_breach: Number,
    notify_role: String // "owner", "manager", "founder"
  }],
  
  channels: {
    email: { type: Boolean, default: true },
    in_app: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.models.SLAConfig || mongoose.model("SLAConfig", slaConfigSchema);

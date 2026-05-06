const mongoose = require("mongoose");

const slaTrackingSchema = new mongoose.Schema({
  entity_type: { 
    type: String, 
    enum: ["Deal", "Task", "AccessRequest", "NDA", "DocumentReview"], 
    required: true 
  },
  entity_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  sla_start_time: { type: Date, required: true, default: Date.now },
  sla_deadline: { type: Date, required: true },
  
  sla_status: { 
    type: String, 
    enum: ["active", "warning", "critical_warning", "breached", "closed"], 
    default: "active" 
  },
  
  breached_at: { type: Date },
  resolved_at: { type: Date },
  
  breach_reason: { type: String, default: "" },
  breach_action_taken: { type: String, default: "" }
}, { timestamps: true });

// Add indices for fast polling
slaTrackingSchema.index({ sla_status: 1, sla_deadline: 1 });
slaTrackingSchema.index({ entity_type: 1, entity_id: 1 });

module.exports = mongoose.models.SLATracking || mongoose.model("SLATracking", slaTrackingSchema);

const SLATracking = require("./sla.model");
const SLAConfig = require("./sla-config.model");
const alertService = require("../alerts/alert.service");

const getSLAConfig = async (entity_type) => {
  return await SLAConfig.findOne({ entity_type });
};

const startSLA = async (entity_type, entity_id, owner_id) => {
  const config = await getSLAConfig(entity_type);
  if (!config) return null; // No SLA configured for this type

  const start_time = new Date();
  const deadline = new Date(start_time.getTime() + config.duration_hours * 60 * 60 * 1000);

  // Close any existing active SLA for this exact entity to avoid duplicates 
  await SLATracking.updateMany(
    { entity_type, entity_id, sla_status: { $in: ["active", "warning", "critical_warning"] } },
    { sla_status: "closed", resolved_at: new Date() }
  );

  const sla = new SLATracking({
    entity_type,
    entity_id,
    owner_id,
    sla_start_time: start_time,
    sla_deadline: deadline,
    sla_status: "active"
  });

  return await sla.save();
};

const resolveSLA = async (id, reason = "", action = "") => {
  const sla = await SLATracking.findById(id);
  if (!sla) throw new Error("SLA record not found");

  sla.sla_status = "closed";
  sla.resolved_at = new Date();
  if (reason) sla.breach_reason = reason;
  if (action) sla.breach_action_taken = action;

  return await sla.save();
};

const processSLAs = async () => {
  const activeSLAs = await SLATracking.find({ sla_status: { $in: ["active", "warning", "critical_warning"] } });
  const now = new Date();

  for (const sla of activeSLAs) {
    const config = await getSLAConfig(sla.entity_type);
    if (!config) continue;

    const totalDuration = sla.sla_deadline.getTime() - sla.sla_start_time.getTime();
    const elapsed = now.getTime() - sla.sla_start_time.getTime();
    const percentElapsed = (elapsed / totalDuration) * 100;

    let newStatus = sla.sla_status;

    if (now > sla.sla_deadline) {
      newStatus = "breached";
      if (sla.sla_status !== "breached") {
        sla.breached_at = now;
        // Trigger Breach Alert
        await alertService.createAlertLog({
          category: "SLA_BREACH",
          severity: "Critical",
          title: `SLA BREACHED: ${sla.entity_type}`,
          message: `${sla.entity_type} SLA breached by owner. Action required immediately.`,
          metadata: { slaId: sla._id, entityId: sla.entity_id }
        });
      }
    } else if (percentElapsed >= config.critical_percent) {
      newStatus = "critical_warning";
    } else if (percentElapsed >= config.warning_percent) {
      newStatus = "warning";
    }

    if (newStatus !== sla.sla_status) {
      sla.sla_status = newStatus;
      await sla.save();
    }
  }

  // Handle Escalations for breached SLAs
  const breachedSLAs = await SLATracking.find({ sla_status: "breached", resolved_at: null });
  for (const sla of breachedSLAs) {
    const config = await getSLAConfig(sla.entity_type);
    if (!config || !config.escalation_rules) continue;

    const hoursSinceBreach = (now.getTime() - sla.breached_at.getTime()) / (1000 * 60 * 60);

    for (const rule of config.escalation_rules) {
      if (hoursSinceBreach >= rule.hours_after_breach && hoursSinceBreach < rule.hours_after_breach + 0.05) { // within 3 mins window
        console.log(`[SLA ESCALATION] ${rule.notify_role} notified for ${sla.entity_type} SLA breach.`);
        await alertService.createAlertLog({
          category: "SLA_ESCALATION",
          severity: "High",
          title: `SLA ESCALATED to ${rule.notify_role.toUpperCase()}`,
          message: `${sla.entity_type} SLA breach unresolved for ${rule.hours_after_breach} hours.`,
          metadata: { slaId: sla._id, entityId: sla.entity_id, role: rule.notify_role }
        });
      }
    }
  }
};

module.exports = {
  startSLA,
  resolveSLA,
  processSLAs,
  getSLAConfig
};

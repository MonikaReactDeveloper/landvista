const SLATracking = require("./sla.model");
const SLAConfig = require("./sla-config.model");
const slaService = require("./sla.service");

const getAllSLAs = async (req, res) => {
  try {
    const slas = await SLATracking.find().populate("owner_id", "fullName email").sort({ sla_deadline: 1 });
    
    const stats = {
      total_active: slas.filter(s => s.sla_status === "active").length,
      total_warning: slas.filter(s => s.sla_status === "warning" || s.sla_status === "critical_warning").length,
      total_breached: slas.filter(s => s.sla_status === "breached").length,
      total_resolved: slas.filter(s => s.sla_status === "closed").length
    };

    res.status(200).json({ slas, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBreachedSLAs = async (req, res) => {
  try {
    const breached = await SLATracking.find({ sla_status: "breached" })
      .populate("owner_id", "fullName email")
      .sort({ breached_at: -1 });
    res.status(200).json(breached);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resolveSLA = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, action } = req.body;
    
    if (!reason) return res.status(400).json({ message: "A breach reason is mandatory to resolve this SLA." });

    const updated = await slaService.resolveSLA(id, reason, action);
    res.status(200).json({ success: true, sla: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConfig = async (req, res) => {
  try {
    const configs = await SLAConfig.find();
    res.status(200).json(configs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveConfig = async (req, res) => {
  try {
    const { entity_type, duration_hours, warning_percent, critical_percent, escalation_rules } = req.body;
    
    let config = await SLAConfig.findOne({ entity_type });
    if (config) {
      config.duration_hours = duration_hours;
      config.warning_percent = warning_percent;
      config.critical_percent = critical_percent;
      if (escalation_rules) config.escalation_rules = escalation_rules;
      await config.save();
    } else {
      config = await SLAConfig.create(req.body);
    }
    
    res.status(200).json({ success: true, config });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSLAs,
  getBreachedSLAs,
  resolveSLA,
  getConfig,
  saveConfig
};

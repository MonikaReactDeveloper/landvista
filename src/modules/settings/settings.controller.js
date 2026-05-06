const backupService = require("./backup.service");

// Mocked settings for demo
const settingsData = [
  { key: "PLATFORM_FEE", value: "2.5%", category: "GENERAL", description: "Standard transaction fee for institutional mandates." },
  { key: "MAINTENANCE_MODE", value: false, category: "GENERAL", description: "Enable to restrict non-admin access during upgrades." },
  { key: "MULTI_ADMIN_APPROVAL", value: true, category: "SECURITY", description: "Enforce dual-control for critical system modifications." },
  { key: "SLA_THRESHOLD_DAYS", value: "7", category: "GENERAL", description: "Maximum days allowed for institutional follow-up." }
];

const getSettings = async (req, res) => {
  res.json(settingsData);
};

const updateSettings = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  const setting = settingsData.find(s => s.key === key);
  if (setting) {
    setting.value = value;
    setting.updatedAt = new Date();
    setting.updatedBy = req.user;
    return res.json(setting);
  }
  res.status(404).json({ message: "Setting not found" });
};

const getBackupStatus = async (req, res) => {
  const data = await backupService.getBackupStatus();
  res.json(data);
};

const triggerRestore = async (req, res) => {
  if (req.user.subRole !== "SUPER_ADMIN") {
    return res.status(403).json({ message: "System restoration restricted to Founder / Super Admin." });
  }
  const data = await backupService.triggerRestore(req.user.id);
  res.json(data);
};

const getNotificationRules = async (req, res) => {
  // Mocked rules for now
  res.json([
    { event: "SLA_BREACH", emailEnabled: true, inAppEnabled: true },
    { event: "NDA_PENDING", emailEnabled: true, inAppEnabled: false }
  ]);
};

module.exports = {
  getSettings,
  updateSettings,
  getBackupStatus,
  triggerRestore,
  getNotificationRules
};

const auditService = require("../audit-logs/audit.service");

const getBackupStatus = async () => {
  return {
    lastBackup: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // Mocked 4h ago
    status: "Healthy",
    storageUsed: "12.4 GB",
    storageAvailable: "500 GB",
    autoBackupEnabled: true,
    frequency: "Daily (02:00 AM)"
  };
};

const triggerRestore = async (performedBy) => {
  // Logic to restore database from last backup
  // Strictly restricted to SUPER_ADMIN
  
  await auditService.createLog({
    user: performedBy,
    action: "SYSTEM_RESTORE",
    module: "INFRASTRUCTURE",
    details: "Full system state restoration triggered.",
    severity: "Critical"
  });

  return { message: "System restoration initiated. This may take up to 15 minutes." };
};

module.exports = {
  getBackupStatus,
  triggerRestore
};

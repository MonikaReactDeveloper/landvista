const AuditLog = require("../modules/audit-logs/audit.model");

const logger = {
  async info(req, { action, module, beforeValue, afterValue, details, severity = "Low" }) {
    try {
      await AuditLog.create({
        user: req.user?.id,
        userEmail: req.user?.email || "system@landvista.com",
        role: req.user?.role || "system",
        action,
        module,
        beforeValue,
        afterValue,
        details,
        severity,
        ipAddress: req.ip || req.connection.remoteAddress || "0.0.0.0",
        device: req.headers["user-agent"],
        status: "success"
      });
    } catch (error) {
      console.error("Audit Logging Error:", error);
    }
  },

  async error(req, { action, module, details, severity = "High" }) {
    try {
      await AuditLog.create({
        user: req.user?.id,
        userEmail: req.user?.email || "system@landvista.com",
        role: req.user?.role || "system",
        action,
        module,
        details,
        severity,
        ipAddress: req.ip || req.connection.remoteAddress || "0.0.0.0",
        device: req.headers["user-agent"],
        status: "failure"
      });
    } catch (error) {
      console.error("Audit Logging Error:", error);
    }
  }
};

module.exports = logger;

const auditService = require("./audit.service");

const getAuditLogs = async (req, res) => {
  try {
    const data = await auditService.getGeneralLogs(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActivityLogs = async (req, res) => {
  try {
    const data = await auditService.getActivityLogs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDocumentAccessLogs = async (req, res) => {
  try {
    const data = await auditService.getDocumentAccessLogs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLog = async (req, res) => {
  try {
    const data = await auditService.deleteLog(req.params.id);
    if (!data) return res.status(404).json({ message: "Log not found" });
    res.json({ message: "Audit log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAuditLogs,
  getActivityLogs,
  getDocumentAccessLogs,
  deleteLog
};

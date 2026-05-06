const AccessRequest = require("./access-request.model");
const SystemException = require("./exception.model");
const User = require("../auth/auth.model");

const getWarRoomOverview = async () => {
  const totalUsers = await User.countDocuments();
  const pendingRequests = await AccessRequest.countDocuments({ status: "Pending" });
  const criticalExceptions = await SystemException.countDocuments({ severity: "critical", isResolved: false });
  
  return {
    systemHealth: criticalExceptions > 0 ? "Warning" : "Healthy",
    metrics: {
      totalUsers,
      pendingApprovals: pendingRequests,
      activeIssues: criticalExceptions
    }
  };
};

const getApprovalQueue = async () => {
  return await AccessRequest.find({ status: "Pending" }).sort({ requestedAt: -1 });
};

const processAccessRequest = async (id, status, adminEmail) => {
  return await AccessRequest.findByIdAndUpdate(
    id,
    { 
      status, 
      processedBy: adminEmail, 
      processedAt: new Date() 
    },
    { new: true }
  );
};

const getExceptions = async (severity = null) => {
  const filter = severity ? { severity } : {};
  return await SystemException.find(filter).sort({ timestamp: -1 });
};

const overrideAction = async (details, adminEmail) => {
  // Logic for administrative override (e.g., forcing a data refresh or bypassing a lock)
  return {
    message: "Administrative override executed",
    performedBy: adminEmail,
    actionDetails: details,
    timestamp: new Date()
  };
};

const updateException = async (id, body) => {
  return await SystemException.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteException = async (id) => {
  return await SystemException.findByIdAndDelete(id);
};

module.exports = {
  getWarRoomOverview,
  getApprovalQueue,
  processAccessRequest,
  getExceptions,
  updateException,
  deleteException,
  overrideAction
};

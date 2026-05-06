const AuditLog = require("./audit.model");
const User = require("../auth/auth.model");

const getGeneralLogs = async (query = {}) => {
  return await AuditLog.find(query)
    .populate("user", "fullName email role")
    .sort({ createdAt: -1 });
};

const getActivityLogs = async () => {
  // Activity logs usually focus on CRUD operations and Logins
  return await AuditLog.find({ 
    action: { $in: ["LOGIN", "REGISTER", "UPDATE_MANDATE", "CREATE_DOCUMENT", "PATCH_ROLE"] } 
  }).populate("user", "fullName email role").sort({ createdAt: -1 });
};

const getDocumentAccessLogs = async () => {
  return await AuditLog.find({ 
    module: "VAULT", 
    action: { $in: ["VIEW_DOCUMENT", "DOWNLOAD_DOCUMENT", "WATERMARK_APPLIED"] } 
  }).populate("user", "fullName email role").sort({ createdAt: -1 });
};

const createLog = async (data) => {
  if (data.user && (!data.userEmail || !data.role)) {
    const user = await User.findById(data.user);
    if (user) {
      data.userEmail = user.email;
      data.role = user.role;
    }
  }
  const log = new AuditLog(data);
  return await log.save();
};

const deleteLog = async (id) => {
  return await AuditLog.findByIdAndDelete(id);
};

module.exports = {
  getGeneralLogs,
  getActivityLogs,
  getDocumentAccessLogs,
  createLog,
  deleteLog
};

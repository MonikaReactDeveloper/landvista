const { Activity, Alert, Document } = require("./investor.model");

// ─── GET /api/investor/dashboard ─────────────────────────────────────────────
const getDashboardStats = async (userId) => {
  // Mocking some stats for the dashboard summary
  const alertCount = await Alert.countDocuments({ userId, isRead: false });
  const docCount = await Document.countDocuments({ userId });
  const recentActivity = await Activity.find({ userId }).sort({ createdAt: -1 }).limit(5);

  return {
    summary: {
      unreadAlerts: alertCount,
      totalDocuments: docCount,
      accountStatus: "Active",
      portfolioValue: "$1.2M (Mock Data)",
    },
    recentActivity,
  };
};

// ─── GET /api/investor/user-activity ─────────────────────────────────────────
const getUserActivity = async (userId) => {
  return await Activity.find({ userId }).sort({ createdAt: -1 });
};

// ─── GET /api/investor/alerts ────────────────────────────────────────────────
const getAlerts = async (userId) => {
  return await Alert.find({ userId }).sort({ createdAt: -1 });
};

// ─── GET /api/investor/recent-documents ──────────────────────────────────────
const getRecentDocuments = async (userId) => {
  return await Document.find({ userId }).sort({ createdAt: -1 }).limit(10);
};

// ─── POST helpers (for testing/seeding) ───────────────────────────────────────
const createActivity = async (userId, action, details) => {
  return await new Activity({ userId, action, details }).save();
};

const createAlert = async (userId, title, message) => {
  return await new Alert({ userId, title, message }).save();
};

const createDocument = async (userId, title, fileUrl) => {
  return await new Document({ userId, title, fileUrl }).save();
};

const updateAlert = async (id, body) => {
  return await Alert.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteAlert = async (id) => {
  return await Alert.findByIdAndDelete(id);
};

const updateDocument = async (id, body) => {
  return await Document.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const updateActivity = async (id, body) => {
  return await Activity.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteActivity = async (id) => {
  return await Activity.findByIdAndDelete(id);
};

const deleteDocument = async (id) => {
  return await Document.findByIdAndDelete(id);
};

module.exports = {
  getDashboardStats,
  getUserActivity,
  getAlerts,
  getRecentDocuments,
  createActivity,
  createAlert,
  createDocument,
  updateActivity,
  deleteActivity,
  updateAlert,
  deleteAlert,
  updateDocument,
  deleteDocument,
};

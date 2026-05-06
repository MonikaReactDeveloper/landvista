const Alert = require("./alert.model");
const AlertLog = require("./alert-log.model");
const Notification = require("./notification.model");
const User = require("../auth/auth.model");
const NotificationPreference = require("./preferences.model");

const getUserAlerts = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

const resolveTemplate = (template, user) => {
  return template.replace(/\{\{(.*?)\}\}/g, (match, p1) => {
    const key = p1.trim();
    return user[key] || match;
  });
};

const dispatchCampaign = async (alertId) => {
  const alert = await Alert.findById(alertId);
  if (!alert) throw new Error("Alert campaign not found");

  let userQuery = {};
  if (alert.audience === "All Investors" || alert.audience === "Investors") userQuery.role = "user";
  if (alert.audience === "Admins Only" || alert.audience === "Admins") userQuery.role = "admin";
  if (alert.audience === "Institutional (Tier 3+)") userQuery.tier = { $in: ["Tier 3", "Tier 4"] };
  if (alert.audience === "Pipeline Only") userQuery.status = "approved"; // Or check if in mandates
  if (alert.audience === "All") userQuery = {}; // All users

  const targetUsers = await User.find(userQuery);
  
  let successCount = 0;
  for (let user of targetUsers) {
    try {
      const personalTitle = resolveTemplate(alert.title, user);
      const personalMessage = resolveTemplate(alert.message, user);

      await Notification.create({
        userId: user._id,
        alertId: alert._id,
        title: personalTitle,
        message: personalMessage,
        type: alert.type
      });
      successCount++;
    } catch (err) {
      console.error(`Failed to dispatch to ${user.email}:`, err);
    }
  }

  alert.status = "Active";
  alert.sentCount = successCount;
  await alert.save();
  return alert;
};

const getAdminAlerts = async () => {
  return await Alert.find().sort({ createdAt: -1 });
};

const getAlertLogs = async () => {
  return await AlertLog.find().sort({ createdAt: -1 }).limit(100);
};

const createAlertLog = async (data) => {
  // Prevent duplicate active alerts for the same metadata (e.g. same mandate breach)
  if (data.metadata?.mandateId) {
    const existing = await AlertLog.findOne({ 
      category: data.category, 
      "metadata.mandateId": data.metadata.mandateId,
      status: "Active"
    });
    if (existing) return existing;
  }
  
  const log = new AlertLog(data);
  return await log.save();
};

const acknowledgeAlertLog = async (id, userId) => {
  return await AlertLog.findByIdAndUpdate(id, { 
    status: "Acknowledged", 
    resolvedBy: userId,
    resolvedAt: new Date()
  }, { new: true });
};

const markAsRead = async (id) => {
  return await Alert.findByIdAndUpdate(id, { isRead: true }, { new: true });
};

const getPreferences = async (userEmail) => {
  let prefs = await NotificationPreference.findOne({ userEmail });
  if (!prefs) {
    prefs = await NotificationPreference.create({ userEmail });
  }
  return prefs;
};

const updatePreferences = async (userEmail, data) => {
  return await NotificationPreference.findOneAndUpdate(
    { userEmail },
    { $set: data },
    { new: true, upsert: true }
  );
};

const createAlert = async (body) => {
  const alert = new Alert(body);
  return await alert.save();
};

const updateAlert = async (id, body) => {
  return await Alert.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteAlert = async (id) => {
  return await Alert.findByIdAndDelete(id);
};

const resetPreferences = async (userEmail) => {
  return await NotificationPreference.findOneAndDelete({ userEmail });
};

module.exports = {
  getUserAlerts,
  getAdminAlerts,
  getAlertLogs,
  createAlertLog,
  acknowledgeAlertLog,
  markAsRead,
  createAlert,
  updateAlert,
  deleteAlert,
  dispatchCampaign,
  getPreferences,
  updatePreferences,
  resetPreferences
};

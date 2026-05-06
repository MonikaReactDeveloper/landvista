const alertService = require("./alert.service");

const getAlerts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await alertService.getUserAlerts(userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAlertAsRead = async (req, res) => {
  try {
    const data = await alertService.markAsRead(req.params.id);
    if (!data) return res.status(404).json({ message: "Alert not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    // Similar to alerts for this demonstration
    const userEmail = req.user.email;
    const data = await alertService.getUserAlerts(userEmail);
    res.json({
      count: data.length,
      notifications: data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const data = await alertService.updatePreferences(userEmail, req.body);
    res.json({ message: "Preferences updated", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPreferences = async (req, res) => {
  try {
    const userEmail = req.user.email;
    await alertService.resetPreferences(userEmail);
    res.json({ message: "Preferences reset to defaults" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPreferences = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const data = await alertService.getPreferences(userEmail);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAlert = async (req, res) => {
  try {
    const data = await alertService.createAlert(req.body);
    
    // If status is Active, trigger dynamic dispatch immediately
    if (req.body.status === "Active") {
      await alertService.dispatchCampaign(data._id);
    }

    res.status(201).json({ message: "Alert created successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAlert = async (req, res) => {
  try {
    const data = await alertService.updateAlert(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Alert not found" });
    res.json({ message: "Alert updated successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAlert = async (req, res) => {
  try {
    const data = await alertService.deleteAlert(req.params.id);
    if (!data) return res.status(404).json({ message: "Alert not found" });
    res.json({ message: "Alert deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminAlerts = async (req, res) => {
  try {
    const data = await alertService.getAdminAlerts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAlertLogs = async (req, res) => {
  try {
    const data = await alertService.getAlertLogs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acknowledgeAlertLog = async (req, res) => {
  try {
    const data = await alertService.acknowledgeAlertLog(req.params.id, req.user.id);
    if (!data) return res.status(404).json({ message: "Alert log not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dispatchAlert = async (req, res) => {
  try {
    const data = await alertService.dispatchCampaign(req.params.id);
    res.json({ message: "Campaign dispatched successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAlerts,
  getAdminAlerts,
  getAlertLogs,
  acknowledgeAlertLog,
  markAlertAsRead,
  getNotifications,
  updatePreferences,
  getPreferences,
  createAlert,
  updateAlert,
  deleteAlert,
  dispatchAlert,
  resetPreferences
};

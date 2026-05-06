const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getAlerts,
  getAdminAlerts,
  getAlertLogs,
  acknowledgeAlertLog,
  markAlertAsRead,
  getNotifications,
  getPreferences,
  updatePreferences,
  resetPreferences,
  createAlert,
  updateAlert,
  deleteAlert
} = require("./alert.controller");

// Admin Routes (Specific ones first to avoid conflict)
router.get("/all", authMiddleware, checkRole("admin"), getAdminAlerts);
router.get("/logs", authMiddleware, checkRole("admin"), getAlertLogs);
router.put("/logs/:id/acknowledge", authMiddleware, checkRole("admin"), acknowledgeAlertLog);

// GET /api/alerts
router.get("/", authMiddleware, getAlerts);

// PATCH /api/alerts/:id/read
router.patch("/:id/read", authMiddleware, markAlertAsRead);

// GET /api/alerts/notifications
router.get("/notifications", authMiddleware, getNotifications);

// POST /api/alerts/notifications (Alias for creating alerts)
router.post("/notifications", authMiddleware, checkRole("admin"), createAlert);

// PUT /api/alerts/notifications/:id (Alias for updating)
router.put("/notifications/:id", authMiddleware, checkRole("admin"), updateAlert);

// DELETE /api/alerts/notifications/:id (Alias for deleting)
router.delete("/notifications/:id", authMiddleware, checkRole("admin"), deleteAlert);

// GET /api/alerts/preferences
router.get("/preferences", authMiddleware, getPreferences);

// POST /api/alerts/preferences
router.post("/preferences", authMiddleware, updatePreferences);

// PUT /api/alerts/preferences (Alias)
router.put("/preferences", authMiddleware, updatePreferences);

// DELETE /api/alerts/preferences (Reset to defaults)
router.delete("/preferences", authMiddleware, resetPreferences);

// PUT /api/alerts/preferences (Alias)
router.put("/preferences", authMiddleware, updatePreferences);

// DELETE /api/alerts/preferences (Reset to defaults)
router.delete("/preferences", authMiddleware, resetPreferences);

// Admin only CRUD
router.post("/", authMiddleware, checkRole("admin"), createAlert);
router.put("/:id", authMiddleware, checkRole("admin"), updateAlert);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteAlert);

module.exports = router;

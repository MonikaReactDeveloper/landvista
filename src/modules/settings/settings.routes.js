const express = require("express");
const router = express.Router();
const settingsController = require("./settings.controller");
const pageController = require("./page.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");

// Admin only routes
router.use(authMiddleware);
router.use(checkRole("admin"));

router.get("/all", settingsController.getSettings);
router.put("/:key", settingsController.updateSettings);

router.get("/backup-status", settingsController.getBackupStatus);
router.post("/restore", settingsController.triggerRestore);

router.get("/notification-rules", settingsController.getNotificationRules);

// Page Content (CMS)
router.get("/page/request-access", pageController.getRequestAccessPage);
router.put("/page/request-access", pageController.updateRequestAccessPage);

module.exports = router;

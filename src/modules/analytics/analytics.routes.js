const express = require("express");
const router = express.Router();
const analyticsController = require("./analytics.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");

// Admin only analytics
router.get("/", authMiddleware, checkRole("admin"), analyticsController.getAnalytics);

module.exports = router;

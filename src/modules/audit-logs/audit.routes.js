const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getAuditLogs,
  getActivityLogs,
  getDocumentAccessLogs,
  deleteLog
} = require("./audit.controller");

// Admin only routes
router.use(authMiddleware);
router.use(checkRole("admin"));

// GET /api/audit
router.get("/", getAuditLogs);

// GET /api/audit/activity
router.get("/activity", getActivityLogs);

// GET /api/audit/vault
router.get("/vault", getDocumentAccessLogs);

// DELETE /api/audit/:id
router.delete("/:id", deleteLog);

module.exports = router;

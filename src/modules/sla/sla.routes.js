const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getAllSLAs,
  getBreachedSLAs,
  resolveSLA,
  getConfig,
  saveConfig
} = require("./sla.controller");

// SLA Administration Routes (Admin War Room)
router.get("/", authMiddleware, checkRole("admin"), getAllSLAs);
router.get("/breached", authMiddleware, checkRole("admin"), getBreachedSLAs);
router.post("/:id/resolve", authMiddleware, checkRole("admin"), resolveSLA);

// SLA Config
router.get("/config", authMiddleware, checkRole("admin"), getConfig);
router.post("/config", authMiddleware, checkRole("admin"), saveConfig);

module.exports = router;

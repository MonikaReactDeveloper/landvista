const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getAllIntelligence,
  getIntelligenceById,
  createIntelligence,
  updateIntelligence,
  deleteIntelligence,
  updateStatus,
} = require("./intelligence.controller");

const trackActivity = require("../../middleware/trackActivity");

// Public/User Routes
router.get("/", authMiddleware, trackActivity("INTELLIGENCE"), getAllIntelligence);
router.get("/:id", authMiddleware, trackActivity("INTELLIGENCE"), getIntelligenceById);


// Admin Routes (Private)
router.post("/", authMiddleware, checkRole("admin"), createIntelligence);
router.put("/:id", authMiddleware, checkRole("admin"), updateIntelligence);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteIntelligence);
router.patch("/:id/status", authMiddleware, checkRole("admin"), updateStatus);

module.exports = router;


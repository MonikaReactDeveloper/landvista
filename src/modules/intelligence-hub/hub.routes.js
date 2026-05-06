const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getIntelligence,
  getIntelligenceById,
  getSignals,
  getRisks,
  getConfidenceScores,
  getFilterOptions,
  createFilter,
  updateFilter,
  deleteFilter,
  createConfidenceScore,
  updateConfidenceScore,
  createIntelligence,
  createSignal,
  createRisk,
  updateIntelligence,
  deleteIntelligence,
} = require("./hub.controller");

// Public-ish / Private
router.get("/", authMiddleware, getIntelligence);
router.get("/signals", authMiddleware, getSignals);
router.get("/risks", authMiddleware, getRisks);
router.get("/confidence-scores", authMiddleware, getConfidenceScores);
router.post("/confidence-scores", authMiddleware, checkRole("admin"), createConfidenceScore);
router.put("/confidence-scores/:id", authMiddleware, checkRole("admin"), updateConfidenceScore);
router.delete("/confidence-scores/:id", authMiddleware, checkRole("admin"), deleteIntelligence);
router.get("/filter-options", authMiddleware, getFilterOptions);
router.post("/filter-options", authMiddleware, checkRole("admin"), createFilter);
router.put("/filter-options/:oldName", authMiddleware, checkRole("admin"), updateFilter);
router.delete("/filter-options/:name", authMiddleware, checkRole("admin"), deleteFilter);
router.get("/:id", authMiddleware, getIntelligenceById);

// Admin only CRUD
router.post("/", authMiddleware, checkRole("admin"), createIntelligence);
router.post("/signals", authMiddleware, checkRole("admin"), createSignal);
router.post("/risks", authMiddleware, checkRole("admin"), createRisk);
router.put("/signals/:id", authMiddleware, checkRole("admin"), updateIntelligence);
router.put("/risks/:id", authMiddleware, checkRole("admin"), updateIntelligence);
router.put("/:id", authMiddleware, checkRole("admin"), updateIntelligence);
router.delete("/signals/:id", authMiddleware, checkRole("admin"), deleteIntelligence);
router.delete("/risks/:id", authMiddleware, checkRole("admin"), deleteIntelligence);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteIntelligence);

module.exports = router;

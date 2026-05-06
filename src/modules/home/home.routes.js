const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getHome,
  getTrustMetrics,
  createTrustMetric,
  getFeaturedInsights,
  getSiteSettings,
  createOrUpdateSiteSettings,
  updateTrustMetric,
  deleteTrustMetric,
} = require("./home.controller");

// GET  /api/home
router.get("/", getHome);

// GET  /api/home/trust-metrics
router.get("/trust-metrics", getTrustMetrics);

// POST /api/home/trust-metrics  (send JSON with iconUrl as image URL string)
router.post("/trust-metrics", authMiddleware, checkRole("admin"), createTrustMetric);

// GET  /api/home/featured-insights
router.get("/featured-insights", getFeaturedInsights);

// GET  /api/home/site-settings
router.get("/site-settings", getSiteSettings);

// POST /api/home/site-settings
router.post("/site-settings", authMiddleware, checkRole("admin"), createOrUpdateSiteSettings);

// PUT /api/home/site-settings
router.put("/site-settings", authMiddleware, checkRole("admin"), createOrUpdateSiteSettings);

// PUT /api/home/trust-metrics/:id
router.put("/trust-metrics/:id", authMiddleware, checkRole("admin"), updateTrustMetric);

// DELETE /api/home/trust-metrics/:id
router.delete("/trust-metrics/:id", authMiddleware, checkRole("admin"), deleteTrustMetric);

module.exports = router;

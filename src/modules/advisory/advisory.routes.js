const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getAdvisory,
  createAdvisory,
  getAdvisoryServices,
  createAdvisoryService,
  getServiceCategories,
  createServiceCategory,
  updateAdvisory,
  deleteAdvisory,
  updateAdvisoryService,
  deleteAdvisoryService,
  updateServiceCategory,
  deleteServiceCategory,
} = require("./advisory.controller");

// GET  /api/advisory
router.get("/", getAdvisory);

// POST /api/advisory (Private - Admin only)
router.post("/", authMiddleware, checkRole("admin"), createAdvisory);

// PUT /api/advisory/:id
router.put("/:id", authMiddleware, checkRole("admin"), updateAdvisory);

// DELETE /api/advisory/:id
router.delete("/:id", authMiddleware, deleteAdvisory);

// GET  /api/advisory/services
router.get("/services", getAdvisoryServices);

// POST /api/advisory/services (Private - Admin only)
router.post("/services", authMiddleware, checkRole("admin"), createAdvisoryService);

// PUT /api/advisory/services/:id
router.put("/services/:id", authMiddleware, checkRole("admin"), updateAdvisoryService);

// DELETE /api/advisory/services/:id
router.delete("/services/:id", authMiddleware, checkRole("admin"), deleteAdvisoryService);

// GET  /api/advisory/service-categories
router.get("/service-categories", getServiceCategories);

// POST /api/advisory/service-categories (Private - Admin only)
router.post("/service-categories", authMiddleware, checkRole("admin"), createServiceCategory);

// PUT /api/advisory/service-categories/:id
router.put("/service-categories/:id", authMiddleware, checkRole("admin"), updateServiceCategory);

// DELETE /api/advisory/service-categories/:id
router.delete("/service-categories/:id", authMiddleware, checkRole("admin"), deleteServiceCategory);

module.exports = router;

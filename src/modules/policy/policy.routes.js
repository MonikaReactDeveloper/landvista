const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getZones,
  getZoneById,
  createZone,
  getSectors,
  getSectorById,
  createSector,
  getPolicyDocuments,
  createPolicyDocument,
  getPolicyUpdates,
  createPolicyUpdate,
  updateZone,
  deleteZone,
  updateSector,
  deleteSector,
  updatePolicyDocument,
  deletePolicyDocument,
  updatePolicyUpdate,
  deletePolicyUpdate,
} = require("./policy.controller");

// GET  /api/policy/zones
router.get("/zones", getZones);

// GET  /api/policy/zones/:id
router.get("/zones/:id", getZoneById);

// POST /api/policy/zones (Private - Admin only)
router.post("/zones", authMiddleware, checkRole("admin"), createZone);

// PUT /api/policy/zones/:id
router.put("/zones/:id", authMiddleware, checkRole("admin"), updateZone);

// DELETE /api/policy/zones/:id
router.delete("/zones/:id", authMiddleware, checkRole("admin"), deleteZone);

// GET  /api/policy/sectors
router.get("/sectors", getSectors);

// GET  /api/policy/sectors/:id
router.get("/sectors/:id", getSectorById);

// POST /api/policy/sectors (Private - Admin only)
router.post("/sectors", authMiddleware, checkRole("admin"), createSector);

// PUT /api/policy/sectors/:id
router.put("/sectors/:id", authMiddleware, checkRole("admin"), updateSector);

// DELETE /api/policy/sectors/:id
router.delete("/sectors/:id", authMiddleware, checkRole("admin"), deleteSector);

// GET  /api/policy/policy-documents
router.get("/policy-documents", getPolicyDocuments);

// POST /api/policy/policy-documents (Private - Admin only)
router.post("/policy-documents", authMiddleware, checkRole("admin"), createPolicyDocument);

// PUT /api/policy/policy-documents/:id
router.put("/policy-documents/:id", authMiddleware, checkRole("admin"), updatePolicyDocument);

// DELETE /api/policy/policy-documents/:id
router.delete("/policy-documents/:id", authMiddleware, checkRole("admin"), deletePolicyDocument);

// GET  /api/policy/policy-updates
router.get("/policy-updates", getPolicyUpdates);

// POST /api/policy/policy-updates (Private - Admin only)
router.post("/policy-updates", authMiddleware, checkRole("admin"), createPolicyUpdate);

// PUT /api/policy/policy-updates/:id
router.put("/policy-updates/:id", authMiddleware, checkRole("admin"), updatePolicyUpdate);

// DELETE /api/policy/policy-updates/:id
router.delete("/policy-updates/:id", authMiddleware, checkRole("admin"), deletePolicyUpdate);

module.exports = router;

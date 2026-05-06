const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getDashboard,
  getUserActivity,
  getAlerts,
  getRecentDocuments,
  seedInvestorData,
  createAlert,
  updateAlert,
  deleteAlert,
  createDocument,
  updateDocument,
  deleteDocument,
  updateActivity,
  deleteActivity,
} = require("./investor.controller");

// 🔒 ALL routes below require a Token and Investor role
router.use(authMiddleware);
router.use(checkRole("investor", "admin"));

// GET /api/investor/dashboard
router.get("/dashboard", getDashboard);

// GET /api/investor/user-activity
router.get("/user-activity", getUserActivity);

// GET /api/investor/alerts
router.get("/alerts", getAlerts);

// GET /api/investor/recent-documents
router.get("/recent-documents", getRecentDocuments);

// POST /api/investor/seed (To create sample data for yourself)
router.post("/seed", seedInvestorData);

// PUT /api/investor/user-activity/:id (Admin only)
router.put("/user-activity/:id", checkRole("admin"), updateActivity);

// DELETE /api/investor/user-activity/:id (Admin only)
router.delete("/user-activity/:id", checkRole("admin"), deleteActivity);

// 🔒 Admin Only routes for managing Investor data
// POST /api/investor/alerts
router.post("/alerts", checkRole("admin"), createAlert);

// PUT /api/investor/alerts/:id
router.put("/alerts/:id", checkRole("admin"), updateAlert);

// DELETE /api/investor/alerts/:id
router.delete("/alerts/:id", checkRole("admin"), deleteAlert);

// POST /api/investor/documents
router.post("/documents", checkRole("admin"), createDocument);

// PUT /api/investor/documents/:id
router.put("/documents/:id", checkRole("admin"), updateDocument);

// DELETE /api/investor/documents/:id
router.delete("/documents/:id", checkRole("admin"), deleteDocument);

module.exports = router;

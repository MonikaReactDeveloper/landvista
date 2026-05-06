const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  approveUser,
  rejectUser,
  assignRole,
  assignTier,
  suspendUser,
  reactivateUser,
  getLoginHistory,
  bulkAction,
  getAllUsers,
  getRoleRequests,
  approveRoleRequest,
} = require("./rbac.controller");

// 🔒 All routes below require Admin Access
router.use(authMiddleware);
router.use(checkRole("admin"));

// User Management
router.get("/users", getAllUsers);
router.patch("/users/:id/approve", approveUser);

router.patch("/users/:id/reject", rejectUser);

// Role & Tier Assignment
router.patch("/users/:id/role", assignRole);
router.patch("/users/:id/tier", assignTier);

// Suspend / Reactivate
router.patch("/users/:id/suspend", suspendUser);
router.patch("/users/:id/reactivate", reactivateUser);

// Logs & History
router.get("/users/:id/login-history", getLoginHistory);

// Bulk Actions
router.post("/bulk-action", bulkAction);

router.get("/requests", checkRole("admin", "founder"), getRoleRequests);
router.post("/requests/:id/approve", checkRole("founder"), approveRoleRequest);

module.exports = router;

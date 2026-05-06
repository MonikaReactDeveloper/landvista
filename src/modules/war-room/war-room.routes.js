const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getOverview,
  getApprovalQueue,
  approveAccess,
  rejectAccess,
  getExceptions,
  updateException,
  deleteException,
  overrideAction
} = require("./war-room.controller");

// Admin only routes
router.use(authMiddleware);
router.use(checkRole("admin"));

router.get("/overview", getOverview);
router.get("/queue", getApprovalQueue);
router.post("/approve", approveAccess);
router.post("/reject", rejectAccess);
router.get("/exceptions", getExceptions);
router.put("/exceptions/:id", updateException);
router.delete("/exceptions/:id", deleteException);
router.post("/override-action", overrideAction);

module.exports = router;

const express = require("express");
const router = express.Router();
const governanceController = require("./governance.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");

router.use(authMiddleware);
router.use(checkRole("admin"));

router.get("/approvals", governanceController.getPendingApprovals);
router.post("/approvals/handle", governanceController.handleApprovalAction);

module.exports = router;

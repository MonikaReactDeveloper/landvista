const express = require("express");
const router = express.Router();
const { submitEngagement, getAllEngagements } = require("./engagement.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");

// Public route for form submission
router.post("/submit", submitEngagement);

// Admin only route to view submissions
router.get("/all", authMiddleware, checkRole("admin"), getAllEngagements);

module.exports = router;

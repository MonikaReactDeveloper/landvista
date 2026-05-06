const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getMandatePipeline,
  getUserMandates,
  getMandateById,
  createMandate,
  updateMandate,
  deleteMandate,
  getMandateDocuments,
  getMandateActivity,
  addMandateDocument,
  updateMandateDocument,
  deleteMandateDocument,
  addMandateActivity,
  updateMandateActivity,
  deleteMandateActivity
} = require("./mandate.controller");

// 🔒 All routes are private
router.use(authMiddleware);

// Admin Routes
router.get("/all", checkRole("admin"), getMandatePipeline);
router.post("/", checkRole("admin"), createMandate);
router.put("/:id", checkRole("admin"), updateMandate);
router.delete("/:id", checkRole("admin"), deleteMandate);

// User Routes
router.get("/", getUserMandates);
router.get("/:id", getMandateById);

// Documents
router.get("/:id/documents", getMandateDocuments);
router.post("/:id/documents", checkRole("admin"), addMandateDocument);
router.put("/:id/documents/:docId", checkRole("admin"), updateMandateDocument);
router.delete("/:id/documents/:docId", checkRole("admin"), deleteMandateDocument);

// Activity
router.get("/:id/activity", getMandateActivity);
router.post("/:id/activity", addMandateActivity);
router.put("/:id/activity/:activityId", addMandateActivity);
router.delete("/:id/activity/:activityId", checkRole("admin"), deleteMandateActivity);

module.exports = router;

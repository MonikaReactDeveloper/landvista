const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const documentUpload = require("../../middleware/documentUpload.middleware");
const {
  getCurrentNDA,
  getAllVersions,
  activateVersion,
  createNDA,
  updateNDA,
  deleteNDA,
  acceptNDA,
  getHistory,
  getStatus
} = require("./nda.controller");

// 🔓 Public-ish (requires login to accept, but can view current)
router.get("/current", authMiddleware, getCurrentNDA);
router.post("/accept", authMiddleware, acceptNDA);
router.get("/history", authMiddleware, getHistory);
router.get("/status", authMiddleware, getStatus);

// 🛠 Admin only Management
router.get("/all-versions", authMiddleware, checkRole("admin"), getAllVersions);
router.post("/create-version", authMiddleware, checkRole("admin"), documentUpload.single("nda"), createNDA);
router.post("/activate/:id", authMiddleware, checkRole("admin"), activateVersion);

// Generic CRUD (Old compatibility)
router.post("/", authMiddleware, checkRole("admin"), documentUpload.single("nda"), createNDA);
router.put("/:id", authMiddleware, checkRole("admin"), updateNDA);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteNDA);

module.exports = router;

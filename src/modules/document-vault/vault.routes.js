const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");
const {
  getDocuments,
  getDocumentById,
  viewDocument,
  watermarkDocument,
  getAudit,
  createDocument,
  updateDocument,
  deleteDocument,
  uploadDocumentFile
} = require("./vault.controller");

const documentUpload = require("../../middleware/documentUpload.middleware");
const trackActivity = require("../../middleware/trackActivity");

// GET /api/documents/all (Admin)
router.get("/all", authMiddleware, checkRole("admin"), getDocuments);

// GET /api/vault
router.get("/", authMiddleware, trackActivity("VAULT"), getDocuments);


// GET /api/vault/:id
router.get("/:id", authMiddleware, trackActivity("VAULT"), getDocumentById);


// POST /api/vault
router.post("/", authMiddleware, checkRole("admin"), createDocument);

// PUT /api/vault/:id
router.put("/:id", authMiddleware, checkRole("admin"), updateDocument);

// DELETE /api/vault/:id
router.delete("/:id", authMiddleware, checkRole("admin"), deleteDocument);

// Specialized endpoints
router.post("/upload", authMiddleware, checkRole("admin"), documentUpload.single("vault"), uploadDocumentFile);
router.get("/:id/view", authMiddleware, viewDocument);
router.post("/:id/watermark", authMiddleware, checkRole("admin"), watermarkDocument);
router.get("/:id/audit", authMiddleware, checkRole("admin"), getAudit);

module.exports = router;

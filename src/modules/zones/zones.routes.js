const express = require("express");
const router = express.Router();
const zonesController = require("./zones.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");

// Public/User routes (Read only)
router.get("/zones", zonesController.getZones);
router.get("/sectors", zonesController.getSectors);

// Admin only routes
router.use(authMiddleware);
router.use(checkRole("admin"));

const documentUpload = require("../../middleware/documentUpload.middleware");

router.post("/zones", zonesController.createZone);
router.put("/zones/:id", zonesController.updateZone);
router.post("/zones/upload-image", documentUpload.single("image"), zonesController.uploadZoneImage);

router.post("/sectors", zonesController.createSector);
router.put("/sectors/:id", zonesController.updateSector);
router.post("/sectors/upload-map", documentUpload.single("map"), zonesController.uploadSectorMap);

router.delete("/zones/:id", zonesController.deleteZone);
router.delete("/sectors/:id", zonesController.deleteSector);

module.exports = router;

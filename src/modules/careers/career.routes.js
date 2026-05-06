const express = require("express");
const router = express.Router();
const { getCareers, getCareerById, createCareer, updateCareer, deleteCareer } = require("./career.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { checkRole } = require("../../middleware/role.middleware");

// PUBLIC ROUTES
router.get("/", getCareers);
router.get("/:id", getCareerById);

// ADMIN ROUTES (Protected)
router.post("/", authMiddleware, checkRole("admin"), createCareer);
router.put("/:id", authMiddleware, checkRole("admin"), updateCareer);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteCareer);

module.exports = router;

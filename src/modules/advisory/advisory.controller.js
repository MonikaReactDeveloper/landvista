const advisoryService = require("./advisory.service");

// ─── GET /api/advisory ────────────────────────────────────────────────────────
exports.getAdvisory = async (req, res) => {
  try {
    const data = await advisoryService.getAdvisory();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/advisory ───────────────────────────────────────────────────────
exports.createAdvisory = async (req, res) => {
  try {
    const data = await advisoryService.createAdvisory(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── GET /api/advisory/services ──────────────────────────────────────────────
exports.getAdvisoryServices = async (req, res) => {
  try {
    const data = await advisoryService.getAdvisoryServices();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/advisory/services ─────────────────────────────────────────────
exports.createAdvisoryService = async (req, res) => {
  try {
    const data = await advisoryService.createAdvisoryService(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── GET /api/advisory/service-categories ────────────────────────────────────
exports.getServiceCategories = async (req, res) => {
  try {
    const data = await advisoryService.getServiceCategories();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/advisory/service-categories ───────────────────────────────────
exports.createServiceCategory = async (req, res) => {
  try {
    const data = await advisoryService.createServiceCategory(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// ─── PUT /api/advisory/:id ──────────────────────────────────────────────────
exports.updateAdvisory = async (req, res) => {
  try {
    const data = await advisoryService.updateAdvisory(req.params.id, req.body);
    if (!data) return res.status(404).json({ success: false, message: "Advisory not found" });
    res.status(200).json({ success: true, message: "Advisory updated successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── DELETE /api/advisory/:id ───────────────────────────────────────────────
exports.deleteAdvisory = async (req, res) => {
  try {
    const data = await advisoryService.deleteAdvisory(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Advisory not found" });
    res.status(200).json({ success: true, message: "Advisory deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── PUT /api/advisory/services/:id ──────────────────────────────────────────
exports.updateAdvisoryService = async (req, res) => {
  try {
    const data = await advisoryService.updateAdvisoryService(req.params.id, req.body);
    if (!data) return res.status(404).json({ success: false, message: "Service not found" });
    res.status(200).json({ success: true, message: "Service updated successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── DELETE /api/advisory/services/:id ───────────────────────────────────────
exports.deleteAdvisoryService = async (req, res) => {
  try {
    const data = await advisoryService.deleteAdvisoryService(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Service not found" });
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── PUT /api/advisory/service-categories/:id ───────────────────────────────
exports.updateServiceCategory = async (req, res) => {
  try {
    const data = await advisoryService.updateServiceCategory(req.params.id, req.body);
    if (!data) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, message: "Category updated successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── DELETE /api/advisory/service-categories/:id ────────────────────────────
exports.deleteServiceCategory = async (req, res) => {
  try {
    const data = await advisoryService.deleteServiceCategory(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

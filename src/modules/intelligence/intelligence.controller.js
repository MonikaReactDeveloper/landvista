const intelligenceService = require("./intelligence.service");

exports.getAllIntelligence = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const data = await intelligenceService.getAllIntelligence(filter);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getIntelligenceById = async (req, res) => {
  try {
    const data = await intelligenceService.getIntelligenceById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Intelligence record not found" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createIntelligence = async (req, res) => {
  try {
    const data = await intelligenceService.createIntelligence(req.body);
    res.status(201).json({ success: true, message: "Intelligence record created successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateIntelligence = async (req, res) => {
  try {
    const data = await intelligenceService.updateIntelligence(req.params.id, req.body, req.user?.name || "Admin");
    res.status(200).json({ success: true, message: "Intelligence record updated successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteIntelligence = async (req, res) => {
  try {
    await intelligenceService.deleteIntelligence(req.params.id);
    res.status(200).json({ success: true, message: "Intelligence record deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, reviewer } = req.body;
    const data = await intelligenceService.updateStatus(req.params.id, status, reviewer);
    res.status(200).json({ success: true, message: `Status updated to ${status}`, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


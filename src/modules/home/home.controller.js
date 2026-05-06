const homeService = require("./home.service");

// ─── GET /api/home ────────────────────────────────────────────────────────────
exports.getHome = async (req, res) => {
  try {
    const data = await homeService.getHomeData();
    res.status(200).json({ success: true, message: "Home data fetched successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET /api/home/trust-metrics ─────────────────────────────────────────────
exports.getTrustMetrics = async (req, res) => {
  try {
    const data = await homeService.getTrustMetrics();
    res.status(200).json({ success: true, message: "Trust metrics fetched successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/home/trust-metrics ────────────────────────────────────────────
exports.createTrustMetric = async (req, res) => {
  try {
    const data = await homeService.createTrustMetric(req.body);
    res.status(201).json({ success: true, message: "Trust metric created successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── GET /api/home/featured-insights ─────────────────────────────────────────
exports.getFeaturedInsights = async (req, res) => {
  try {
    const data = await homeService.getFeaturedInsights();
    res.status(200).json({ success: true, message: "Featured insights fetched successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET /api/home/site-settings ─────────────────────────────────────────────
exports.getSiteSettings = async (req, res) => {
  try {
    const data = await homeService.getSiteSettings();
    res.status(200).json({ success: true, message: "Site settings fetched successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST /api/home/site-settings ────────────────────────────────────────────
exports.createOrUpdateSiteSettings = async (req, res) => {
  try {
    const data = await homeService.createOrUpdateSiteSettings(req.body);
    res.status(200).json({ success: true, message: "Site settings saved successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// ─── PUT /api/home/trust-metrics/:id ─────────────────────────────────────────
exports.updateTrustMetric = async (req, res) => {
  try {
    const data = await homeService.updateTrustMetric(req.params.id, req.body);
    if (!data) return res.status(404).json({ success: false, message: "Trust metric not found" });
    res.status(200).json({ success: true, message: "Trust metric updated successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── DELETE /api/home/trust-metrics/:id ──────────────────────────────────────
exports.deleteTrustMetric = async (req, res) => {
  try {
    const data = await homeService.deleteTrustMetric(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Trust metric not found" });
    res.status(200).json({ success: true, message: "Trust metric deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

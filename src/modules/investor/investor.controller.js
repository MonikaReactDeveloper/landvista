const investorService = require("./investor.service");

// ─── GET /api/investor/dashboard ─────────────────────────────────────────────
exports.getDashboard = async (req, res) => {
  try {
    // req.user comes from authMiddleware
    const data = await investorService.getDashboardStats(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET /api/investor/user-activity ─────────────────────────────────────────
exports.getUserActivity = async (req, res) => {
  try {
    const data = await investorService.getUserActivity(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET /api/investor/alerts ────────────────────────────────────────────────
exports.getAlerts = async (req, res) => {
  try {
    const data = await investorService.getAlerts(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET /api/investor/recent-documents ──────────────────────────────────────
exports.getRecentDocuments = async (req, res) => {
  try {
    const data = await investorService.getRecentDocuments(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── POST (Internal/Admin) for seeding data ──────────────────────────────────
  exports.seedInvestorData = async (req, res) => {
    try {
      const userId = req.user.id;
      await investorService.createActivity(userId, "System Check", "Dashboard initialized");
      await investorService.createAlert(userId, "Welcome!", "Welcome to your LandVista Investor Dashboard.");
      await investorService.createDocument(userId, "Investment Guide", "http://example.com/guide.pdf");
      
      res.status(201).json({ success: true, message: "Sample data created for your account!" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // ─── POST /api/investor/alerts ───────────────────────────────────────────────
  exports.createAlert = async (req, res) => {
    try {
      const { userId, title, message } = req.body;
      const data = await investorService.createAlert(userId, title, message);
      res.status(201).json({ success: true, message: "Alert created successfully", data });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // ─── PUT /api/investor/alerts/:id ────────────────────────────────────────────
  exports.updateAlert = async (req, res) => {
    try {
      const data = await investorService.updateAlert(req.params.id, req.body);
      if (!data) return res.status(404).json({ success: false, message: "Alert not found" });
      res.json({ success: true, message: "Alert updated successfully", data });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // ─── DELETE /api/investor/alerts/:id ─────────────────────────────────────────
  exports.deleteAlert = async (req, res) => {
    try {
      const data = await investorService.deleteAlert(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: "Alert not found" });
      res.json({ success: true, message: "Alert deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // ─── POST /api/investor/documents ────────────────────────────────────────────
  exports.createDocument = async (req, res) => {
    try {
      const { userId, title, fileUrl } = req.body;
      const data = await investorService.createDocument(userId, title, fileUrl);
      res.status(201).json({ success: true, message: "Document created successfully", data });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // ─── PUT /api/investor/documents/:id ─────────────────────────────────────────
  exports.updateDocument = async (req, res) => {
    try {
      const data = await investorService.updateDocument(req.params.id, req.body);
      if (!data) return res.status(404).json({ success: false, message: "Document not found" });
      res.json({ success: true, message: "Document updated successfully", data });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // ─── DELETE /api/investor/documents/:id ──────────────────────────────────────
  exports.deleteDocument = async (req, res) => {
    try {
      const data = await investorService.deleteDocument(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: "Document not found" });
      res.json({ success: true, message: "Document deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  // ─── PUT /api/investor/user-activity/:id ─────────────────────────────────────
  exports.updateActivity = async (req, res) => {
    try {
      const data = await investorService.updateActivity(req.params.id, req.body);
      if (!data) return res.status(404).json({ success: false, message: "Activity not found" });
      res.json({ success: true, message: "Activity updated successfully", data });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // ─── DELETE /api/investor/user-activity/:id ──────────────────────────────────
  exports.deleteActivity = async (req, res) => {
    try {
      const data = await investorService.deleteActivity(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: "Activity not found" });
      res.json({ success: true, message: "Activity deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

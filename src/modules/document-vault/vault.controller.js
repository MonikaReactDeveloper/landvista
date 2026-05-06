const vaultService = require("./vault.service");
const alertService = require("../alerts/alert.service");

const getDocuments = async (req, res) => {
  try {
    const data = await vaultService.getAllDocuments(req.user, req.query);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const data = await vaultService.getDocumentById(req.params.id);
    if (!data) return res.status(404).json({ message: "Document not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewDocument = async (req, res) => {
  try {
    const docId = req.params.id;
    
    // 🛡️ Access Gating
    const hasAccess = await vaultService.checkDocumentAccess(req.user, docId);
    if (!hasAccess) {
        return res.status(403).json({ message: "Access denied. Signed NDA and Mandate fit required." });
    }

    // Log the view action
    const data = await vaultService.logAudit(docId, "Viewed", req.user.email, req.ip);
    if (!data) return res.status(404).json({ message: "Document not found" });

    // Trigger alert for sensitive access (Tier 4)
    if (data.accessTier === "Tier 4") {
      await alertService.createAlertLog({
        category: "Document",
        severity: "Critical",
        title: "Sensitive Document Access",
        message: `User ${req.user.email} has accessed Tier 4 document: "${data.title}"`,
        metadata: { docId: data._id, userEmail: req.user.email }
      });
    }

    res.json({
      message: "Document access logged",
      fileUrl: data.fileUrl,
      isWatermarked: data.isWatermarked
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const watermarkDocument = async (req, res) => {
  try {
    const userName = req.user.email || "Unknown User";
    const data = await vaultService.applyWatermark(req.params.id, userName);
    if (!data) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Watermark applied successfully", document: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAudit = async (req, res) => {
  try {
    const data = await vaultService.getAuditTrail(req.params.id);
    if (!data) return res.status(404).json({ message: "Document not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDocument = async (req, res) => {
  try {
    const userName = req.user.email || "Unknown User";
    const data = await vaultService.createDocument(req.body, userName);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    const data = await vaultService.updateDocument(req.params.id, req.body);
    if (!data) return res.status(404).json({ success: false, message: "Document not found" });
    
    // Log the update
    await vaultService.logAudit(req.params.id, "Updated", req.user.email, req.ip);
    
    res.status(200).json({ success: true, message: "Document updated successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const data = await vaultService.deleteDocument(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Document not found" });
    res.status(200).json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadDocumentFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Build the URL (assuming server is on port 5000 as configured earlier)
        const fileUrl = `http://localhost:5000/uploads/vault/${req.file.filename}`;
        
        res.status(200).json({ 
            success: true, 
            fileUrl,
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            fileSize: `${Math.round(req.file.size / 1024)} KB`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getDocuments,
  getDocumentById,
  viewDocument,
  watermarkDocument,
  getAudit,
  createDocument,
  updateDocument,
  deleteDocument,
  uploadDocumentFile
};

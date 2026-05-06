const policyService = require("./policy.service");

// ─── GET /api/policy/zones ────────────────────────────────────────────────────
exports.getZones = async (req, res) => {
  try {
    const data = await policyService.getZones();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET /api/policy/zones/:id ────────────────────────────────────────────────
exports.getZoneById = async (req, res) => {
  try {
    const data = await policyService.getZoneById(req.params.id);
    if (!data) return res.status(404).json({ message: "Zone not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/policy/zones ───────────────────────────────────────────────────
exports.createZone = async (req, res) => {
  try {
    const data = await policyService.createZone(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── GET /api/policy/sectors ──────────────────────────────────────────────────
exports.getSectors = async (req, res) => {
  try {
    const data = await policyService.getSectors();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET /api/policy/sectors/:id ─────────────────────────────────────────────
exports.getSectorById = async (req, res) => {
  try {
    const data = await policyService.getSectorById(req.params.id);
    if (!data) return res.status(404).json({ message: "Sector not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/policy/sectors ─────────────────────────────────────────────────
exports.createSector = async (req, res) => {
  try {
    const data = await policyService.createSector(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── GET /api/policy/policy-documents ────────────────────────────────────────
exports.getPolicyDocuments = async (req, res) => {
  try {
    const data = await policyService.getPolicyDocuments();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/policy/policy-documents ───────────────────────────────────────
exports.createPolicyDocument = async (req, res) => {
  try {
    const data = await policyService.createPolicyDocument(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── GET /api/policy/policy-updates ──────────────────────────────────────────
exports.getPolicyUpdates = async (req, res) => {
  try {
    const data = await policyService.getPolicyUpdates();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/policy/policy-updates ─────────────────────────────────────────
exports.createPolicyUpdate = async (req, res) => {
  try {
    const data = await policyService.createPolicyUpdate(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// ─── PUT /api/policy/zones/:id ──────────────────────────────────────────────
exports.updateZone = async (req, res) => {
  try {
    const data = await policyService.updateZone(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Zone not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── DELETE /api/policy/zones/:id ───────────────────────────────────────────
exports.deleteZone = async (req, res) => {
  try {
    const data = await policyService.deleteZone(req.params.id);
    if (!data) return res.status(404).json({ message: "Zone not found" });
    res.status(200).json({ message: "Zone deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── PUT /api/policy/sectors/:id ────────────────────────────────────────────
exports.updateSector = async (req, res) => {
  try {
    const data = await policyService.updateSector(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Sector not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── DELETE /api/policy/sectors/:id ──────────────────────────────────────────
exports.deleteSector = async (req, res) => {
  try {
    const data = await policyService.deleteSector(req.params.id);
    if (!data) return res.status(404).json({ message: "Sector not found" });
    res.status(200).json({ message: "Sector deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── PUT /api/policy/policy-documents/:id ────────────────────────────────────
exports.updatePolicyDocument = async (req, res) => {
  try {
    const data = await policyService.updatePolicyDocument(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Document not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── DELETE /api/policy/policy-documents/:id ──────────────────────────────────
exports.deletePolicyDocument = async (req, res) => {
  try {
    const data = await policyService.deletePolicyDocument(req.params.id);
    if (!data) return res.status(404).json({ message: "Document not found" });
    res.status(200).json({ message: "Policy document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── PUT /api/policy/policy-updates/:id ──────────────────────────────────────
exports.updatePolicyUpdate = async (req, res) => {
  try {
    const data = await policyService.updatePolicyUpdate(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Update not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── DELETE /api/policy/policy-updates/:id ───────────────────────────────────
exports.deletePolicyUpdate = async (req, res) => {
  try {
    const data = await policyService.deletePolicyUpdate(req.params.id);
    if (!data) return res.status(404).json({ message: "Update not found" });
    res.status(200).json({ message: "Policy update deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

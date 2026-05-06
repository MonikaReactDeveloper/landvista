const { Zone, Sector, PolicyDocument, PolicyUpdate } = require("./policy.model");

// ─── GET /api/policy/zones ────────────────────────────────────────────────────
const getZones = async () => {
  return await Zone.find({ status: "Active" }).sort({ createdAt: -1 });
};

// ─── GET /api/policy/zones/:id ────────────────────────────────────────────────
const getZoneById = async (id) => {
  return await Zone.findById(id);
};

// ─── GET /api/policy/sectors ──────────────────────────────────────────────────
const getSectors = async () => {
  return await Sector.find({ status: "Active" })
    .populate("zone", "name slug")
    .sort({ createdAt: -1 });
};

// ─── GET /api/policy/sectors/:id ─────────────────────────────────────────────
const getSectorById = async (id) => {
  return await Sector.findById(id);
};

// ─── GET /api/policy/policy-documents ────────────────────────────────────────
const getPolicyDocuments = async () => {
  return await PolicyDocument.find({ isActive: true }).sort({ publishedAt: -1 });
};

// ─── GET /api/policy/policy-updates ──────────────────────────────────────────
const getPolicyUpdates = async () => {
  return await PolicyUpdate.find({ isActive: true }).sort({ publishedAt: -1 });
};

// ─── POST helpers ─────────────────────────────────────────────────────────────
const createZone = async (body) => {
  const zone = new Zone(body);
  return await zone.save();
};

const createSector = async (body) => {
  const sector = new Sector(body);
  return await sector.save();
};

const createPolicyDocument = async (body) => {
  const doc = new PolicyDocument(body);
  return await doc.save();
};

const createPolicyUpdate = async (body) => {
  const update = new PolicyUpdate(body);
  return await update.save();
};

const updateZone = async (id, body) => {
  return await Zone.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteZone = async (id) => {
  return await Zone.findByIdAndDelete(id);
};

const updateSector = async (id, body) => {
  return await Sector.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteSector = async (id) => {
  return await Sector.findByIdAndDelete(id);
};

const updatePolicyDocument = async (id, body) => {
  return await PolicyDocument.findOneAndUpdate({ id: Number(id) }, body, { new: true, runValidators: true });
};

const deletePolicyDocument = async (id) => {
  return await PolicyDocument.findOneAndDelete({ id: Number(id) });
};

const updatePolicyUpdate = async (id, body) => {
  return await PolicyUpdate.findOneAndUpdate({ id: Number(id) }, body, { new: true, runValidators: true });
};

const deletePolicyUpdate = async (id) => {
  return await PolicyUpdate.findOneAndDelete({ id: Number(id) });
};

module.exports = {
  getZones,
  getZoneById,
  getSectors,
  getSectorById,
  getPolicyDocuments,
  getPolicyUpdates,
  createZone,
  updateZone,
  deleteZone,
  createSector,
  updateSector,
  deleteSector,
  createPolicyDocument,
  updatePolicyDocument,
  deletePolicyDocument,
  createPolicyUpdate,
  updatePolicyUpdate,
  deletePolicyUpdate,
};

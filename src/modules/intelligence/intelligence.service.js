const Intelligence = require("./intelligence.model");

const getAllIntelligence = async (filter = {}) => {
  return await Intelligence.find(filter).sort({ createdAt: -1 });
};

const getIntelligenceById = async (id) => {
  return await Intelligence.findById(id);
};

const createIntelligence = async (data) => {
  const intelligence = new Intelligence(data);
  return await intelligence.save();
};

const updateIntelligence = async (id, data, updatedBy = "System Admin") => {
  const existing = await Intelligence.findById(id);
  if (!existing) throw new Error("Intelligence record not found");

  // Add to version history
  const versionRecord = {
    version: existing.version,
    changes: `Updated by ${updatedBy}`,
    updatedAt: new Date(),
    updatedBy: updatedBy
  };

  data.version = existing.version + 1;
  data.versionHistory = [...existing.versionHistory, versionRecord];
  data.lastUpdatedBy = updatedBy;

  return await Intelligence.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteIntelligence = async (id) => {
  return await Intelligence.findByIdAndDelete(id);
};

const updateStatus = async (id, status, reviewer = null) => {
  const updateData = { status };
  if (reviewer) updateData.reviewer = reviewer;
  
  return await Intelligence.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  getAllIntelligence,
  getIntelligenceById,
  createIntelligence,
  updateIntelligence,
  deleteIntelligence,
  updateStatus
};


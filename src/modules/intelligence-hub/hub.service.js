const IntelligenceHub = require("./hub.model");

const getAllIntelligence = async (filters = {}) => {
  return await IntelligenceHub.find({ ...filters, isActive: true });
};

const getIntelligenceById = async (id) => {
  return await IntelligenceHub.findById(id);
};

const getAllSignals = async () => {
  return await IntelligenceHub.find({ category: "Market Signal", isActive: true });
};

const getAllRisks = async () => {
  return await IntelligenceHub.find({ category: "Risk", isActive: true });
};

const getConfidenceScores = async () => {
  const reports = await IntelligenceHub.find({ isActive: true }, "title confidenceScore");
  return reports.map((r) => ({
    reportId: r._id,
    title: r.title,
    score: r.confidenceScore,
  }));
};

const getFilterOptions = async () => {
  const categories = await IntelligenceHub.distinct("category");
  const regions = await IntelligenceHub.distinct("region");
  const sectors = await IntelligenceHub.distinct("sector");
  return { categories, regions, sectors };
};

const createIntelligence = async (body) => {
  const report = new IntelligenceHub(body);
  return await report.save();
};

const updateIntelligence = async (id, body) => {
  return await IntelligenceHub.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteIntelligence = async (id) => {
  return await IntelligenceHub.findByIdAndDelete(id);
};

const updateManyCategories = async (oldName, newName) => {
  return await IntelligenceHub.updateMany({ category: oldName }, { category: newName });
};

const deleteByCategory = async (category) => {
  return await IntelligenceHub.deleteMany({ category });
};

module.exports = {
  getAllIntelligence,
  getIntelligenceById,
  getAllSignals,
  getAllRisks,
  getConfidenceScores,
  getFilterOptions,
  createIntelligence,
  updateIntelligence,
  deleteIntelligence,
  updateManyCategories,
  deleteByCategory,
};

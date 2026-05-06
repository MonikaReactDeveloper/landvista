const { Advisory, AdvisoryService, ServiceCategory } = require("./advisory.model");

// ─── GET /api/advisory ────────────────────────────────────────────────────────
const getAdvisory = async () => {
  return await Advisory.find({ isActive: true });
};

// ─── GET /api/advisory/services ──────────────────────────────────────────────
const getAdvisoryServices = async () => {
  return await AdvisoryService.find({ isActive: true }).sort({ order: 1 });
};

// ─── GET /api/advisory/service-categories ────────────────────────────────────
const getServiceCategories = async () => {
  return await ServiceCategory.find({ isActive: true }).sort({ order: 1 });
};

// ─── POST /api/advisory ───────────────────────────────────────────────────────
const createAdvisory = async (body) => {
  const advisory = new Advisory(body);
  return await advisory.save();
};

// ─── POST /api/advisory/services ─────────────────────────────────────────────
const createAdvisoryService = async (body) => {
  const service = new AdvisoryService(body);
  return await service.save();
};

// ─── POST /api/advisory/service-categories ────────────────────────────────────
const createServiceCategory = async (body) => {
  const category = new ServiceCategory(body);
  return await category.save();
};

const updateAdvisory = async (id, body) => {
  return await Advisory.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteAdvisory = async (id) => {
  return await Advisory.findByIdAndDelete(id);
};

const updateAdvisoryService = async (id, body) => {
  return await AdvisoryService.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteAdvisoryService = async (id) => {
  return await AdvisoryService.findByIdAndDelete(id);
};

const updateServiceCategory = async (id, body) => {
  return await ServiceCategory.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteServiceCategory = async (id) => {
  return await ServiceCategory.findByIdAndDelete(id);
};

module.exports = {
  getAdvisory,
  getAdvisoryServices,
  getServiceCategories,
  createAdvisory,
  updateAdvisory,
  deleteAdvisory,
  createAdvisoryService,
  updateAdvisoryService,
  deleteAdvisoryService,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};

const hubService = require("./hub.service");

const getIntelligence = async (req, res) => {
  try {
    const filters = req.query;
    const data = await hubService.getAllIntelligence(filters);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIntelligenceById = async (req, res) => {
  try {
    const data = await hubService.getIntelligenceById(req.params.id);
    if (!data) return res.status(404).json({ message: "Intelligence report not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSignals = async (req, res) => {
  try {
    const data = await hubService.getAllSignals();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRisks = async (req, res) => {
  try {
    const data = await hubService.getAllRisks();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConfidenceScores = async (req, res) => {
  try {
    const data = await hubService.getConfidenceScores();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    const data = await hubService.getFilterOptions();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFilter = async (req, res) => {
  try {
    const { category } = req.body;
    // We create a hidden dummy report to register the new category
    await hubService.createIntelligence({ title: "Filter Entry", category, isActive: false });
    res.status(201).json({ message: `Filter category '${category}' added successfully` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFilter = async (req, res) => {
  try {
    const { oldName } = req.params;
    const { newName } = req.body;
    await hubService.updateManyCategories(oldName, newName);
    res.json({ message: `Filter category renamed from '${oldName}' to '${newName}'` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFilter = async (req, res) => {
  try {
    const { name } = req.params;
    await hubService.deleteByCategory(name);
    res.json({ message: `Filter category '${name}' removed successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createConfidenceScore = async (req, res) => {
  try {
    const { title, score } = req.body;
    const data = await hubService.createIntelligence({ 
      title: title || "Unnamed Score Entry", 
      confidenceScore: score,
      category: "Market Signal" 
    });
    res.status(201).json({ message: "Score entry created successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateConfidenceScore = async (req, res) => {
  try {
    const { score } = req.body;
    const data = await hubService.updateIntelligence(req.params.id, { confidenceScore: score });
    if (!data) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Confidence score updated successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createSignal = async (req, res) => {
  try {
    const data = await hubService.createIntelligence({ ...req.body, category: "Market Signal" });
    res.status(201).json({ message: "Market Signal created successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createRisk = async (req, res) => {
  try {
    const data = await hubService.createIntelligence({ ...req.body, category: "Risk" });
    res.status(201).json({ message: "Risk report created successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createIntelligence = async (req, res) => {
  try {
    const data = await hubService.createIntelligence(req.body);
    res.status(201).json({ message: "Intelligence report created successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateIntelligence = async (req, res) => {
  try {
    const data = await hubService.updateIntelligence(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Intelligence report updated successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteIntelligence = async (req, res) => {
  try {
    const data = await hubService.deleteIntelligence(req.params.id);
    if (!data) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Intelligence report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getIntelligence,
  getIntelligenceById,
  getSignals,
  getRisks,
  getConfidenceScores,
  getFilterOptions,
  createFilter,
  updateFilter,
  deleteFilter,
  createConfidenceScore,
  updateConfidenceScore,
  createIntelligence,
  createSignal,
  createRisk,
  updateIntelligence,
  deleteIntelligence,
};

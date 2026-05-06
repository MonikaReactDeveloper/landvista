const mandateService = require("./mandate.service");

const getMandatePipeline = async (req, res) => {
  try {
    const data = await mandateService.getMandatePipeline();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserMandates = async (req, res) => {
  try {
    const data = await mandateService.getMandatesForUser(req.user.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMandateById = async (req, res) => {
  try {
    const data = await mandateService.getMandateById(req.params.id);
    if (!data) return res.status(404).json({ message: "Mandate not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createMandate = async (req, res) => {
  try {
    const data = await mandateService.createMandate(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateMandate = async (req, res) => {
  try {
    const data = await mandateService.updateMandate(req.params.id, req.body, req.user);
    if (!data) return res.status(404).json({ message: "Mandate not found" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMandateDocuments = async (req, res) => {
  try {
    const data = await mandateService.getMandateDocuments(req.params.id);
    if (!data) return res.status(404).json({ message: "Mandate not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMandateActivity = async (req, res) => {
  try {
    const data = await mandateService.getMandateActivity(req.params.id);
    if (!data) return res.status(404).json({ message: "Mandate not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMandate = async (req, res) => {
  try {
    const data = await mandateService.deleteMandate(req.params.id);
    if (!data) return res.status(404).json({ message: "Mandate not found" });
    res.json({ message: "Mandate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMandateActivity = async (req, res) => {
  try {
    const data = await mandateService.addMandateActivity(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Mandate not found" });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMandateActivity = async (req, res) => {
  try {
    const data = await mandateService.updateMandateActivity(req.params.id, req.params.activityId, req.body);
    if (!data) return res.status(404).json({ message: "Mandate or Activity not found" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMandateActivity = async (req, res) => {
  try {
    const data = await mandateService.deleteMandateActivity(req.params.id, req.params.activityId);
    if (!data) return res.status(404).json({ message: "Mandate or Activity not found" });
    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMandateDocument = async (req, res) => {
  try {
    const data = await mandateService.addMandateDocument(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Mandate not found" });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMandateDocument = async (req, res) => {
  try {
    const data = await mandateService.updateMandateDocument(req.params.id, req.params.docId, req.body);
    if (!data) return res.status(404).json({ message: "Mandate or Document not found" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMandateDocument = async (req, res) => {
  try {
    const data = await mandateService.deleteMandateDocument(req.params.id, req.params.docId);
    if (!data) return res.status(404).json({ message: "Mandate or Document not found" });
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMandatePipeline,
  getUserMandates,
  getMandateById,


  createMandate,
  updateMandate,
  deleteMandate,
  getMandateDocuments,
  getMandateActivity,
  addMandateActivity,
  updateMandateActivity,
  deleteMandateActivity,
  addMandateDocument,
  updateMandateDocument,
  deleteMandateDocument,
};

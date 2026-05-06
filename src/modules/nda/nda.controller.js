const ndaService = require("./nda.service");

const getCurrentNDA = async (req, res) => {
  try {
    const data = await ndaService.getCurrentNDA();
    if (!data) return res.status(404).json({ message: "No active NDA found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptNDA = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const data = await ndaService.acceptNDA(userEmail, {
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    });
    res.status(201).json({ message: "NDA accepted successfully", acceptance: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const data = await ndaService.getAcceptanceHistory(userEmail);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStatus = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const data = await ndaService.getNDAStatus(userEmail);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVersions = async (req, res) => {
  try {
    const data = await ndaService.getAllVersions();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const activateVersion = async (req, res) => {
  try {
    const data = await ndaService.activateVersion(req.params.id);
    res.json({ message: "NDA version activated successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNDA = async (req, res) => {
  try {
    console.log("NDA Creation Request:", req.body);
    console.log("Uploaded File:", req.file);
    const body = req.body;
    if (req.file) {
      body.fileUrl = `http://localhost:3000/uploads/ndas/${req.file.filename}`;
    }
    const data = await ndaService.createNDA(body);
    res.status(201).json({ message: "NDA created successfully", data });
  } catch (error) {
    console.error("NDA Creation Error:", error);
    res.status(400).json({ message: error.message });
  }
};



const updateNDA = async (req, res) => {
  try {
    const data = await ndaService.updateNDA(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "NDA not found" });
    res.json({ message: "NDA updated successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNDA = async (req, res) => {
  try {
    const data = await ndaService.deleteNDA(req.params.id);
    if (!data) return res.status(404).json({ message: "NDA not found" });
    res.json({ message: "NDA deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCurrentNDA,
  getAllVersions,
  activateVersion,
  createNDA,

  updateNDA,
  deleteNDA,
  acceptNDA,
  getHistory,
  getStatus
};

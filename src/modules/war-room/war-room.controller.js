const warRoomService = require("./war-room.service");

const getOverview = async (req, res) => {
  try {
    const data = await warRoomService.getWarRoomOverview();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApprovalQueue = async (req, res) => {
  try {
    const data = await warRoomService.getApprovalQueue();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveAccess = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Request ID is required" });
    
    const adminEmail = req.user.email;
    const data = await warRoomService.processAccessRequest(id, "Approved", adminEmail);
    if (!data) return res.status(404).json({ message: "Request not found" });
    
    res.json({ message: "Access request approved", request: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectAccess = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Request ID is required" });
    
    const adminEmail = req.user.email;
    const data = await warRoomService.processAccessRequest(id, "Rejected", adminEmail);
    if (!data) return res.status(404).json({ message: "Request not found" });
    
    res.json({ message: "Access request rejected", request: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExceptions = async (req, res) => {
  try {
    const { severity } = req.query;
    const data = await warRoomService.getExceptions(severity);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const overrideAction = async (req, res) => {
  try {
    const adminEmail = req.user.email;
    const data = await warRoomService.overrideAction(req.body, adminEmail);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateException = async (req, res) => {
  try {
    const data = await warRoomService.updateException(req.params.id, req.body);
    if (!data) return res.status(404).json({ message: "Exception not found" });
    res.json({ message: "Exception updated successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteException = async (req, res) => {
  try {
    const data = await warRoomService.deleteException(req.params.id);
    if (!data) return res.status(404).json({ message: "Exception not found" });
    res.json({ message: "Exception deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOverview,
  getApprovalQueue,
  approveAccess,
  rejectAccess,
  getExceptions,
  updateException,
  deleteException,
  overrideAction
};

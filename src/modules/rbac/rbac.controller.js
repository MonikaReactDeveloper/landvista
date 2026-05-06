const rbacService = require("./rbac.service");

// Approve User
exports.approveUser = async (req, res) => {
  try {
    const data = await rbacService.approveUser(req.params.id, req.user.id);
    res.json({ success: true, message: "User approved successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Reject User
exports.rejectUser = async (req, res) => {
  try {
    const data = await rbacService.rejectUser(req.params.id, req.body.reason);
    res.json({ success: true, message: "User rejected successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Assign Role
exports.assignRole = async (req, res) => {
  try {
    const data = await rbacService.assignRole(req.params.id, req.body.role, req.user.id);
    res.json({ success: true, message: "Role updated successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Assign Tier
exports.assignTier = async (req, res) => {
  try {
    const data = await rbacService.assignTier(req.params.id, req.body.tier, req.user.id);
    res.json({ success: true, message: "Tier updated successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Suspend User
exports.suspendUser = async (req, res) => {
  try {
    const data = await rbacService.suspendUser(req.params.id, req.body.reason);
    res.json({ success: true, message: "User suspended", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Reactivate User
exports.reactivateUser = async (req, res) => {
  try {
    const data = await rbacService.reactivateUser(req.params.id);
    res.json({ success: true, message: "User reactivated", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get Login History
exports.getLoginHistory = async (req, res) => {
  try {
    const data = await rbacService.getUserLoginHistory(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Bulk Actions
exports.bulkAction = async (req, res) => {
  try {
    const { userIds, action, reason } = req.body;
    let result;
    if (action === "approve") {
      result = await rbacService.bulkApprove(userIds, req.user.id);
    } else if (action === "reject") {
      result = await rbacService.bulkReject(userIds, reason);
    }
    res.json({ success: true, message: "Bulk action completed", result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await rbacService.getAllUsers();
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getRoleRequests = async (req, res) => {
  try {
    const RoleRequest = require("./role-request.model");
    const data = await RoleRequest.find({ status: "pending" })
      .populate("targetUser", "fullName email")
      .populate("requestedBy", "fullName email");
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.approveRoleRequest = async (req, res) => {
  try {
    // Only founder can approve
    if (req.user.role !== "founder") {
      return res.status(403).json({ success: false, message: "Only founders can approve sensitive role changes" });
    }
    const data = await rbacService.approveRoleRequest(req.params.id, req.user.id);
    res.json({ success: true, message: "Request approved", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


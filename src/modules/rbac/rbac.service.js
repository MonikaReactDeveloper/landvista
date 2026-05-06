const User = require("../auth/auth.model");
const RoleRequest = require("./role-request.model");

// ─── ADMIN: Approve/Reject User ──────────────────────────────────────────────
const approveUser = async (userId, adminId) => {
  return await User.findByIdAndUpdate(
    userId,
    { status: "approved", approvedBy: adminId, approvedAt: Date.now() },
    { new: true }
  );
};

const rejectUser = async (userId, reason) => {
  return await User.findByIdAndUpdate(
    userId,
    { status: "rejected", rejectionReason: reason },
    { new: true }
  );
};

// ─── ADMIN: Role & Tier Management ───────────────────────────────────────────
const assignRole = async (userId, role, requestedByAdminId) => {
  const sensitiveRoles = ["admin", "founder", "Admin", "Founder"];
  
  if (sensitiveRoles.includes(role)) {
    // Requires Dual Approval
    return await RoleRequest.create({
      targetUser: userId,
      requestedBy: requestedByAdminId,
      requestedRole: role,
      requestedTier: "N/A"
    });
  }

  return await User.findByIdAndUpdate(userId, { role, $inc: { tokenVersion: 1 } }, { new: true });
};

const assignTier = async (userId, tier, requestedByAdminId) => {
  const sensitiveTiers = ["Tier 3", "Tier 4"];
  
  if (sensitiveTiers.includes(tier)) {
    // Requires Dual Approval
    return await RoleRequest.create({
      targetUser: userId,
      requestedBy: requestedByAdminId,
      requestedRole: "N/A",
      requestedTier: tier
    });
  }

  return await User.findByIdAndUpdate(userId, { tier, $inc: { tokenVersion: 1 } }, { new: true });
};

const approveRoleRequest = async (requestId, approverId) => {
  const request = await RoleRequest.findById(requestId);
  if (!request) throw new Error("Request not found");
  
  request.status = "approved";
  request.approvedBy = approverId;
  await request.save();

  const updates = { $inc: { tokenVersion: 1 } };
  if (request.requestedRole !== "N/A") updates.role = request.requestedRole;
  if (request.requestedTier !== "N/A") updates.tier = request.requestedTier;

  return await User.findByIdAndUpdate(request.targetUser, updates, { new: true });
};

// ─── ADMIN: Suspend/Reactivate User ──────────────────────────────────────────
const suspendUser = async (userId, reason) => {
  return await User.findByIdAndUpdate(
    userId,
    { status: "suspended", suspensionReason: reason, isActive: false, $inc: { tokenVersion: 1 } },
    { new: true }
  );
};

const reactivateUser = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    { status: "approved", isActive: true },
    { new: true }
  );
};

// ─── ADMIN: View Login History ───────────────────────────────────────────────
const getUserLoginHistory = async (userId) => {
  return await User.findById(userId, "loginHistory fullName email");
};

// ─── ADMIN: Bulk Actions ─────────────────────────────────────────────────────
const bulkApprove = async (userIds, adminId) => {
  return await User.updateMany(
    { _id: { $in: userIds } },
    { status: "approved", approvedBy: adminId, approvedAt: Date.now() }
  );
};

const bulkReject = async (userIds, reason) => {
  return await User.updateMany(
    { _id: { $in: userIds } },
    { status: "rejected", rejectionReason: reason }
  );
};

const getAllUsers = async () => {
  return await User.find().select("-password");
};


module.exports = {
  approveUser,
  rejectUser,
  assignRole,
  assignTier,
  suspendUser,
  reactivateUser,
  getUserLoginHistory,
  bulkApprove,
  bulkReject,
  getAllUsers,
  approveRoleRequest,
};


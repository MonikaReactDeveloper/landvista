const ApprovalRequest = require("./approval-request.model");
const auditService = require("../audit-logs/audit.service");

const createRequest = async (requestedBy, action, module, payload) => {
  const request = new ApprovalRequest({
    requestedBy,
    action,
    module,
    payload
  });
  await request.save();

  await auditService.createLog({
    user: requestedBy,
    action: "APPROVAL_REQUEST_CREATED",
    module: "GOVERNANCE",
    details: `Dual-control request initiated for action: ${action}`,
    severity: "Medium"
  });

  return request;
};

const approveRequest = async (requestId, approvedBy) => {
  const request = await ApprovalRequest.findById(requestId);
  if (!request) throw new Error("Approval request not found");
  
  if (request.requestedBy.toString() === approvedBy.toString()) {
    throw new Error("Self-approval is strictly prohibited for critical institutional actions.");
  }

  request.status = "Approved";
  request.approvedBy = approvedBy;
  await request.save();

  await auditService.createLog({
    user: approvedBy,
    action: "APPROVAL_REQUEST_APPROVED",
    module: "GOVERNANCE",
    details: `Dual-control request approved for action: ${request.action} (Original request by: ${request.requestedBy})`,
    severity: "High"
  });

  return request;
};

const rejectRequest = async (requestId, rejectedBy, reason) => {
  const request = await ApprovalRequest.findById(requestId);
  if (!request) throw new Error("Approval request not found");

  request.status = "Rejected";
  request.approvedBy = rejectedBy; // Re-using approvedBy as the reviewer
  request.reason = reason;
  await request.save();

  await auditService.createLog({
    user: rejectedBy,
    action: "APPROVAL_REQUEST_REJECTED",
    module: "GOVERNANCE",
    details: `Dual-control request rejected for action: ${request.action}. Reason: ${reason}`,
    severity: "Medium"
  });

  return request;
};

const getPendingRequests = async () => {
  return await ApprovalRequest.find({ status: "Pending" })
    .populate("requestedBy", "fullName email role subRole")
    .sort({ createdAt: -1 });
};

module.exports = {
  createRequest,
  approveRequest,
  rejectRequest,
  getPendingRequests
};

const approvalService = require("./approval.service");

const getPendingApprovals = async (req, res) => {
  try {
    const data = await approvalService.getPendingRequests();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleApprovalAction = async (req, res) => {
  try {
    const { requestId, action, reason } = req.body; // action: 'Approve' or 'Reject'
    const reviewerId = req.user.id;

    let data;
    if (action === "Approve") {
      data = await approvalService.approveRequest(requestId, reviewerId);
      // NOTE: Execution of the payload would happen here or in a background worker
      // For this institutional demo, we mark it as Approved. 
      // In a real app, we'd trigger the specific service method with the payload.
    } else {
      data = await approvalService.rejectRequest(requestId, reviewerId, reason);
    }

    res.json({ message: `Dual-control request ${action}ed successfully`, data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPendingApprovals,
  handleApprovalAction
};

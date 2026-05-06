const Mandate = require("./mandate.model");
const alertService = require("../alerts/alert.service");
const auditService = require("../audit-logs/audit.service");

const getAllMandates = async (filters = {}) => {
  return await Mandate.find({ ...filters });
};

const getMandatePipeline = async () => {
  const mandates = await Mandate.find({ status: "Active" })
    .populate("investor", "fullName email organization")
    .populate("owner", "fullName email") // Ensure owner is populated
    .sort({ dealScore: -1 });

  const now = new Date();
  
  // Dynamic SLA Calculation Logic
  for (let mandate of mandates) {
    if (mandate.nextFollowUpDate) {
      const followUp = new Date(mandate.nextFollowUpDate);
      const diffMs = followUp - now;
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      let newSlaStatus = "On Track";
      if (diffMs < 0) {
        newSlaStatus = "Breached";
      } else if (diffDays <= 2) {
        newSlaStatus = "Delayed";
      }

      if (mandate.slaStatus !== newSlaStatus) {
        mandate.slaStatus = newSlaStatus;
        await mandate.save();

        if (newSlaStatus === "Breached") {
          await alertService.createAlertLog({
            category: "SLA",
            severity: "Critical",
            title: "Institutional SLA Breach",
            message: `Mandate "${mandate.name}" has breached its follow-up SLA threshold.`,
            metadata: { mandateId: mandate._id }
          });
        }
      }
    }
  }

  return mandates;
};


const getMandatesForUser = async (userId) => {
  return await Mandate.find({ investor: userId, status: "Active" })
    .sort({ updatedAt: -1 });
};


const getMandateById = async (id) => {
  return await Mandate.findById(id).populate("investor", "fullName email organization");
};

const createMandate = async (data) => {
  const mandate = new Mandate(data);
  const saved = await mandate.save();
  
  try {
    const slaService = require("../sla/sla.service");
    await slaService.startSLA("Deal", saved._id, saved.owner || saved.investor);
  } catch (err) {
    console.error("Failed to start SLA for new Deal:", err);
  }

  return saved;
};

const updateMandate = async (id, data, performer = null) => {
  // Add an activity log entry for the update
  const mandate = await Mandate.findById(id);
  if (mandate) {
    const beforeValue = { ...mandate._doc };

    // --- SLA ENFORCEMENT ---
    try {
      const SLATracking = require("../sla/sla.model");
      const slaService = require("../sla/sla.service");
      const activeBreach = await SLATracking.findOne({ entity_id: id, sla_status: "breached" });
      
      if (activeBreach) {
        if (!data.breach_reason) {
          throw new Error("SLA Breach Enforcement: Cannot modify mandate without a breach_reason.");
        }
        await slaService.resolveSLA(activeBreach._id, data.breach_reason, "Forced resolution via mandate update");
      }

      if (data.stage && data.stage !== mandate.stage) {
        await slaService.startSLA("Deal", mandate._id, mandate.owner || mandate.investor);
      }
    } catch (err) {
      if (err.message.includes("SLA Breach Enforcement")) throw err;
      console.error("SLA Error during mandate update:", err);
    }
    // -----------------------
    
    // Log Founder Override specifically
    if (data.founderOverride !== undefined && data.founderOverride !== mandate.founderOverride) {
      await auditService.createLog({
        user: performer?.id,
        action: "FOUNDER_OVERRIDE",
        module: "PIPELINE",
        details: `Founder Override ${data.founderOverride ? 'Activated' : 'Deactivated'} for mandate: ${mandate.name}`,
        severity: "High",
        beforeValue: { founderOverride: mandate.founderOverride },
        afterValue: { founderOverride: data.founderOverride }
      });
    }

    mandate.activity.push({
      action: "Updated Mandate",
      details: `Fields updated: ${Object.keys(data).join(", ")}`,
      performedBy: performer?.fullName || "System"
    });
    
    Object.assign(mandate, data);
    const updated = await mandate.save();

    // Log general update
    await auditService.createLog({
      user: performer?.id,
      action: "UPDATE_MANDATE",
      module: "PIPELINE",
      details: `Mandate updated: ${mandate.name}`,
      beforeValue,
      afterValue: updated
    });

    return updated;
  }
  return null;
};

const getMandateDocuments = async (id) => {
  const mandate = await Mandate.findById(id, "documents");
  return mandate ? mandate.documents : null;
};

const getMandateActivity = async (id) => {
  const mandate = await Mandate.findById(id, "activity");
  return mandate ? mandate.activity : null;
};

const deleteMandate = async (id) => {
  return await Mandate.findByIdAndDelete(id);
};

const addMandateActivity = async (id, activityData) => {
  const mandate = await Mandate.findById(id);
  if (mandate) {
    mandate.activity.push(activityData);
    return await mandate.save();
  }
  return null;
};

const updateMandateActivity = async (id, activityId, activityData) => {
  const mandate = await Mandate.findById(id);
  if (mandate) {
    const activity = mandate.activity.id(activityId);
    if (activity) {
      Object.assign(activity, activityData);
      return await mandate.save();
    }
  }
  return null;
};

const deleteMandateActivity = async (id, activityId) => {
  const mandate = await Mandate.findById(id);
  if (mandate) {
    mandate.activity.pull(activityId);
    return await mandate.save();
  }
  return null;
};

const addMandateDocument = async (id, docData) => {
  const mandate = await Mandate.findById(id);
  if (mandate) {
    mandate.documents.push(docData);
    return await mandate.save();
  }
  return null;
};

const updateMandateDocument = async (id, docId, docData) => {
  const mandate = await Mandate.findById(id);
  if (mandate) {
    const doc = mandate.documents.id(docId);
    if (doc) {
      Object.assign(doc, docData);
      return await mandate.save();
    }
  }
  return null;
};

const deleteMandateDocument = async (id, docId) => {
  const mandate = await Mandate.findById(id);
  if (mandate) {
    mandate.documents.pull(docId);
    return await mandate.save();
  }
  return null;
};

module.exports = {
  getAllMandates,
  getMandatePipeline,
  getMandatesForUser,
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

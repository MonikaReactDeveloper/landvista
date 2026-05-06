const VaultDocument = require("./vault.model");

const Mandate = require("../mandates/mandate.model");
const auditService = require("../audit-logs/audit.service");

const getAllDocuments = async (user, filters = {}) => {
  // 1. Admin bypass
  if (user.role === "admin") {
    return await VaultDocument.find({ ...filters, isActive: true })
      .populate('restrictedToUsers', 'fullName email')
      .populate('restrictedToMandate', 'name');
  }

  // 2. Strict NDA check & Approved check
  if (user.status !== "approved" || user.ndaStatus !== "signed") {
    return []; // No NDA or not approved, no documents
  }

  // 3. Tier-based, Mandate-restricted, Role, User-specific filtering
  const userMandates = await Mandate.find({ investor: user.id });
  const mandateIds = userMandates.map(m => m._id);

  const userTierNum = parseInt((user.tier || "Tier 0").replace("Tier ", "")) || 0;
  const validTiers = ["Tier 1", "Tier 2", "Tier 3", "Tier 4"].filter((_, i) => i + 1 <= userTierNum);

  return await VaultDocument.find({
    ...filters,
    isActive: true,
    $or: [
      { restrictedToUsers: user._id },
      { restrictedToMandate: { $in: mandateIds } },
      {
        $and: [
          { $or: [{ restrictedToUsers: { $exists: false } }, { restrictedToUsers: { $size: 0 } }] },
          { $or: [{ restrictedToMandate: { $exists: false } }, { restrictedToMandate: null }] },
          { accessTier: { $in: validTiers } },
          { $or: [
              { allowedRoles: { $exists: false } },
              { allowedRoles: { $size: 0 } },
              { allowedRoles: user.role }
            ]
          }
        ]
      }
    ]
  }).populate('restrictedToUsers', 'fullName email').populate('restrictedToMandate', 'name');
};


const getDocumentById = async (id) => {
  return await VaultDocument.findById(id);
};
 
const checkDocumentAccess = async (user, docId) => {
  if (user.role === "admin") return true;
  if (user.status !== "approved" || user.ndaStatus !== "signed") return false;

  const doc = await VaultDocument.findById(docId);
  if (!doc || !doc.isActive) return false;

  // 1. User specific
  if (doc.restrictedToUsers && doc.restrictedToUsers.length > 0) {
    return doc.restrictedToUsers.some(id => id.toString() === user.id.toString());
  }

  // 2. Mandate specific
  if (doc.restrictedToMandate) {
    const mandate = await Mandate.findOne({ _id: doc.restrictedToMandate, investor: user.id });
    if (mandate) return true;
    return false; // If restricted to mandate and user doesn't have it, deny
  }

  // 3. If neither user nor mandate restricted, check role and tier
  const docTierNum = parseInt((doc.accessTier || "Tier 0").replace("Tier ", "")) || 0;
  const userTierNum = parseInt((user.tier || "Tier 0").replace("Tier ", "")) || 0;

  const roleMatch = (!doc.allowedRoles || doc.allowedRoles.length === 0) || doc.allowedRoles.includes(user.role);
  const tierMatch = userTierNum >= docTierNum;

  return roleMatch && tierMatch;
};

const logAudit = async (docId, action, user, ip = "0.0.0.0") => {
  const doc = await VaultDocument.findByIdAndUpdate(
    docId,
    {
      $push: {
        auditTrail: { action, user: user.email, ip }
      }
    },
    { new: true }
  );

  // 📝 Also log to global Audit Logs
  await auditService.createLog({
    user: user.id,
    action: "VIEW_DOCUMENT",
    module: "VAULT",
    details: `Accessed document: ${doc.title}`,
    ip: ip
  });

  return doc;
};

const applyWatermark = async (id, userName) => {
  const doc = await VaultDocument.findById(id);
  if (doc) {
    doc.isWatermarked = true;
    doc.auditTrail.push({
      action: "Watermark Applied",
      user: userName
    });
    return await doc.save();
  }
  return null;
};

const getAuditTrail = async (id) => {
  const doc = await VaultDocument.findById(id, "auditTrail");
  return doc ? doc.auditTrail : null;
};

const createDocument = async (data, userName) => {
  const doc = new VaultDocument({
    ...data,
    auditTrail: [{ action: "Uploaded", user: userName }]
  });
  return await doc.save();
};

const updateDocument = async (id, body) => {
  return await VaultDocument.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteDocument = async (id) => {
  return await VaultDocument.findByIdAndDelete(id);
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  logAudit,
  applyWatermark,
  getAuditTrail,
  createDocument
};

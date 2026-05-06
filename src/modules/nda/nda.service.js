const NDA = require("./nda.model");
const NDAAcceptance = require("./nda-acceptance.model");
const User = require("../auth/auth.model"); // Import User model
const alertService = require("../alerts/alert.service");
const auditService = require("../audit-logs/audit.service");

const getCurrentNDA = async () => {
  return await NDA.findOne({ status: "Active" }).sort({ version: -1 });
};

const getAllVersions = async () => {
  return await NDA.find().sort({ createdAt: -1 });
};

const activateVersion = async (id) => {
  // Archive all others
  await NDA.updateMany({}, { status: "Archived" });
  // Activate this one
  return await NDA.findByIdAndUpdate(id, { status: "Active" }, { new: true });
};



const acceptNDA = async (userEmail, data) => {
  const currentNDA = await getCurrentNDA();
  if (!currentNDA) throw new Error("No active NDA version found");

  // 1. Record the acceptance in the history
  const acceptance = new NDAAcceptance({
    userEmail,
    ndaVersion: currentNDA.version,
    ipAddress: data.ipAddress,
    userAgent: data.userAgent
  });
  await acceptance.save();

  // 2. Update the user's status in the User model
  const user = await User.findOneAndUpdate(
    { email: userEmail },
    { ndaStatus: "signed" },
    { new: true }
  );

  await alertService.createAlertLog({
    category: "NDA",
    severity: "Info",
    title: "NDA Executed",
    message: `Institutional participant ${userEmail} has signed NDA v${currentNDA.version}.`,
    metadata: { userEmail, ndaVersion: currentNDA.version }
  });

  await auditService.createLog({
    user: user._id,
    action: "NDA_SIGN",
    module: "NDA",
    details: `User signed NDA version ${currentNDA.version}`,
    severity: "Medium",
    ipAddress: data.ipAddress,
    device: data.userAgent
  });

  return acceptance;
};

const getAcceptanceHistory = async (userEmail) => {
  return await NDAAcceptance.find({ userEmail }).sort({ acceptedAt: -1 });
};

const getNDAStatus = async (userEmail) => {
  const currentNDA = await getCurrentNDA();
  if (!currentNDA) return { accepted: false, message: "No active NDA found" };

  const lastAcceptance = await NDAAcceptance.findOne({
    userEmail,
    ndaVersion: currentNDA.version
  });

  return {
    accepted: !!lastAcceptance,
    currentVersion: currentNDA.version,
    lastAcceptedAt: lastAcceptance ? lastAcceptance.acceptedAt : null
  };
};

const createNDA = async (body) => {
  // If the new one is active (default), archive others
  if (!body.status || body.status === "Active") {
    await NDA.updateMany({}, { status: "Archived" });
  }
  const nda = new NDA(body);
  return await nda.save();
};


const updateNDA = async (id, body) => {
  return await NDA.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteNDA = async (id) => {
  return await NDA.findByIdAndDelete(id);
};

module.exports = {
  getCurrentNDA,
  getAllVersions,
  activateVersion,
  createNDA,

  updateNDA,
  deleteNDA,
  acceptNDA,
  getAcceptanceHistory,
  getNDAStatus
};

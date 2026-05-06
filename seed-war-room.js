require("dotenv").config();
const mongoose = require("mongoose");
const AccessRequest = require("./src/modules/war-room/access-request.model");
const SystemException = require("./src/modules/war-room/exception.model");

const seedRequests = [
  {
    userEmail: "investor2@landvista.com",
    requestType: "NDA_BYPASS",
    status: "Pending",
    reason: "Requires urgent access to 'Metro Plaza' documents for board review."
  },
  {
    userEmail: "analyst@landvista.com",
    requestType: "ADMIN_ROLE",
    status: "Pending",
    reason: "Needs permission to manage property listings."
  }
];

const seedExceptions = [
  {
    type: "SECURITY_BREACH",
    message: "Multiple failed login attempts detected from IP: 192.168.45.12",
    severity: "high",
    metadata: { ip: "192.168.45.12", attempts: 15 }
  },
  {
    type: "DB_TIMEOUT",
    message: "MongoDB connection timed out for 3.5 seconds.",
    severity: "medium"
  },
  {
    type: "CRITICAL_ERROR",
    message: "Payment Gateway returned 500 error during transaction #TRX-998.",
    severity: "critical",
    isResolved: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    await AccessRequest.deleteMany({});
    await SystemException.deleteMany({});
    console.log("Cleared old War-Room data.");

    await AccessRequest.insertMany(seedRequests);
    await SystemException.insertMany(seedExceptions);
    console.log("War-Room data seeded successfully! 🛰️");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

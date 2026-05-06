require("dotenv").config();
const mongoose = require("mongoose");
const AuditLog = require("./src/modules/audit-logs/audit.model");

const seedLogs = [
  {
    userEmail: "admin@landvista.com",
    action: "LOGIN",
    module: "AUTH",
    details: "Admin logged in successfully",
    ipAddress: "192.168.1.1"
  },
  {
    userEmail: "investor1@landvista.com",
    action: "VIEW_DOCUMENT",
    module: "VAULT",
    details: "Viewed document: Land Deed - Green Valley",
    ipAddress: "203.0.113.45"
  },
  {
    userEmail: "admin@landvista.com",
    action: "UPDATE_MANDATE",
    module: "MANDATES",
    details: "Status changed for 'Metro Plaza' to Active",
    ipAddress: "192.168.1.1"
  },
  {
    userEmail: "investor2@landvista.com",
    action: "DOWNLOAD_DOCUMENT",
    module: "VAULT",
    details: "Downloaded Financial Audit 2023",
    ipAddress: "110.234.56.78"
  },
  {
    userEmail: "analyst@landvista.com",
    action: "PATCH_ROLE",
    module: "RBAC",
    details: "Attempted to update role - Access Denied",
    ipAddress: "172.16.254.1",
    status: "failure"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    await AuditLog.deleteMany({});
    console.log("Cleared old audit logs.");

    await AuditLog.insertMany(seedLogs);
    console.log("Audit Logs seeded successfully! 📋");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

require("dotenv").config();
const mongoose = require("mongoose");
const VaultDocument = require("./src/modules/document-vault/vault.model");

const seedData = [
  {
    title: "Land Deed - Green Valley",
    fileName: "green_valley_deed.pdf",
    fileUrl: "http://storage.landvista.com/docs/gv_deed.pdf",
    fileSize: "2.4 MB",
    fileType: "application/pdf",
    category: "Legal",
    isWatermarked: false,
    auditTrail: [
      { action: "Uploaded", user: "Admin", timestamp: new Date(Date.now() - 86400000) }
    ]
  },
  {
    title: "Financial Audit 2023",
    fileName: "audit_2023.pdf",
    fileUrl: "http://storage.landvista.com/docs/audit_23.pdf",
    fileSize: "5.1 MB",
    fileType: "application/pdf",
    category: "Financial",
    isWatermarked: true,
    auditTrail: [
      { action: "Uploaded", user: "Finance_Dept", timestamp: new Date(Date.now() - 172800000) },
      { action: "Watermark Applied", user: "System", timestamp: new Date(Date.now() - 160000000) }
    ]
  },
  {
    title: "Identity Proof - CEO",
    fileName: "ceo_passport.jpg",
    fileUrl: "http://storage.landvista.com/docs/id_ceo.jpg",
    fileSize: "800 KB",
    fileType: "image/jpeg",
    category: "Identity",
    isWatermarked: false,
    auditTrail: [
      { action: "Uploaded", user: "Admin", timestamp: new Date(Date.now() - 43200000) }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    await VaultDocument.deleteMany({});
    console.log("Cleared old vault documents.");

    await VaultDocument.insertMany(seedData);
    console.log("Document Vault seeded successfully! 🚀");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

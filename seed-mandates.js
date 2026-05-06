require("dotenv").config();
const mongoose = require("mongoose");
const Mandate = require("./src/modules/mandates/mandate.model");

const seedData = [
  {
    title: "Green Valley Land Acquisition",
    clientName: "EcoBuild Solutions",
    type: "Buy",
    status: "Active",
    value: 5000000,
    location: "California, USA",
    description: "Acquiring 50 acres of land for a sustainable housing project.",
    documents: [
      { title: "Zoning Report", fileUrl: "http://example.com/zoning.pdf", category: "Legal" },
      { title: "Site Survey", fileUrl: "http://example.com/survey.jpg", category: "Technical" }
    ],
    activity: [
      { action: "Created Mandate", performedBy: "Admin", details: "Initial setup completed" },
      { action: "Document Uploaded", performedBy: "System", details: "Zoning report added" }
    ]
  },
  {
    title: "Metro Plaza Leasing Mandate",
    clientName: "Retail Group Inc.",
    type: "Lease",
    status: "Pending",
    value: 120000,
    location: "London, UK",
    description: "Leasing out 5000 sqft of commercial space.",
    documents: [
      { title: "Lease Agreement Draft", fileUrl: "http://example.com/lease.docx", category: "Contract" }
    ],
    activity: [
      { action: "Created Mandate", performedBy: "Analyst", details: "Awaiting client approval" }
    ]
  },
  {
    title: "Harbor View Asset Disposal",
    clientName: "Logistics Corp",
    type: "Sell",
    status: "Closed",
    value: 12500000,
    location: "Singapore",
    description: "Selling off warehouse assets in the harbor district.",
    documents: [
      { title: "Valuation Report", fileUrl: "http://example.com/valuation.pdf", category: "Finance" },
      { title: "Sale Deed", fileUrl: "http://example.com/deed.pdf", category: "Legal" }
    ],
    activity: [
      { action: "Created Mandate", performedBy: "Admin" },
      { action: "Status Changed", details: "Moved to Closed after final transaction" }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    await Mandate.deleteMany({});
    console.log("Cleared old mandates.");

    await Mandate.insertMany(seedData);
    console.log("Mandates seeded successfully! 🚀");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

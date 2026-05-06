require("dotenv").config();
const mongoose = require("mongoose");
const IntelligenceHub = require("./src/modules/intelligence-hub/hub.model");

const seedData = [
  {
    title: "Quarterly Market Report: Q1 2024",
    description: "In-depth analysis of real estate trends across Asia Pacific.",
    category: "Market",
    region: "Asia Pacific",
    sector: "Commercial",
    confidenceScore: 92,
    signals: [
      { name: "Rental Yield", value: "5.4%", trend: "up", status: "positive" },
      { name: "Occupancy Rate", value: "88%", trend: "stable", status: "neutral" },
      { name: "Investor Sentiment", value: "High", trend: "up", status: "positive" }
    ],
    risks: [
      { level: "low", description: "Interest rate fluctuations", impact: "Minimal impact on long-term leases" },
      { level: "medium", description: "Supply chain delays", impact: "Delayed completion of new projects" }
    ],
    tags: ["quarterly", "commercial", "apac"]
  },
  {
    title: "Urban Development Regulatory Update",
    description: "New zoning laws and their impact on residential expansion.",
    category: "Regulatory",
    region: "North America",
    sector: "Residential",
    confidenceScore: 85,
    signals: [
      { name: "Permit Approvals", value: "-12%", trend: "down", status: "negative" },
      { name: "Government Subsidy", value: "$2B", trend: "up", status: "positive" }
    ],
    risks: [
      { level: "high", description: "New environmental tax", impact: "Increased construction costs by 8%" }
    ],
    tags: ["regulation", "zoning", "residential"]
  },
  {
    title: "Global Economic Impact Study",
    description: "How inflation is affecting land prices globally.",
    category: "Economic",
    region: "Global",
    sector: "Land",
    confidenceScore: 78,
    signals: [
      { name: "Inflation Index", value: "3.2%", trend: "stable", status: "neutral" },
      { name: "Currency Volatility", value: "Moderate", trend: "up", status: "negative" }
    ],
    risks: [
      { level: "critical", description: "Global recession fears", impact: "Potential 15% drop in transaction volume" }
    ],
    tags: ["economics", "inflation", "land"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    await IntelligenceHub.deleteMany({});
    console.log("Cleared old data.");

    await IntelligenceHub.insertMany(seedData);
    console.log("Intelligence Hub seeded successfully! 🚀");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

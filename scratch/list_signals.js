const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Use absolute path to avoid confusion
const modelPath = path.join(__dirname, "../src/modules/intelligence-hub/hub.model");
// Require the model directly (since it is exported as module.exports = IntelligenceHub)
const IntelligenceHub = require(modelPath);

async function listSignals() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/landvista");
    const signals = await IntelligenceHub.find({ category: "Market Signal" });
    
    console.log("\n--- CURRENT SIGNALS IN DATABASE ---");
    if (signals.length === 0) {
      console.log("No signals found. Use POST to create one first.");
    } else {
      signals.forEach(s => {
        console.log(`ID: ${s._id} | Title: ${s.title}`);
      });
    }
    console.log("-----------------------------------\n");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

listSignals();

require("dotenv").config();
const mongoose = require("mongoose");
const { Advisory, AdvisoryService, ServiceCategory } = require("./src/modules/advisory/advisory.model");

const getIds = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    let advisory = await Advisory.findOne();
    if (!advisory) {
      advisory = await Advisory.create({ title: "Test Advisory" });
      console.log("Created dummy Advisory.");
    }

    let service = await AdvisoryService.findOne();
    if (!service) {
      service = await AdvisoryService.create({ name: "Test Service", category: "Test" });
      console.log("Created dummy Service.");
    }

    let category = await ServiceCategory.findOne();
    if (!category) {
      category = await ServiceCategory.create({ name: "Test Category" });
      console.log("Created dummy Category.");
    }

    console.log("\n--- YOUR IDs FOR TESTING ---");
    console.log("Advisory ID:         ", advisory._id.toString());
    console.log("Advisory Service ID: ", service._id.toString());
    console.log("Service Category ID: ", category._id.toString());

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

getIds();

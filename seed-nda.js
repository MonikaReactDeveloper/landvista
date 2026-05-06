require("dotenv").config();
const mongoose = require("mongoose");
const NDA = require("./src/modules/nda/nda.model");
const NDAAcceptance = require("./src/modules/nda/nda-acceptance.model");

const seedNDA = {
  version: "v1.0.2024",
  content: "This Non-Disclosure Agreement (the 'Agreement') is entered into by and between LandVista and the User. The User agrees to maintain the confidentiality of all property data, financial reports, and market intelligence provided through the platform. Unauthorized sharing or reproduction of this data is strictly prohibited and may lead to legal action.",
  isActive: true
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    await NDA.deleteMany({});
    await NDAAcceptance.deleteMany({});
    console.log("Cleared old NDA data.");

    await NDA.create(seedNDA);
    console.log("NDA content seeded successfully! 📄");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

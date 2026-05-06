require("dotenv").config();
const mongoose = require("mongoose");
const { Advisory } = require("./src/modules/advisory/advisory.model");

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    const advisories = await Advisory.find({});
    console.log("ALL ADVISORIES IN DB:", JSON.stringify(advisories, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
checkData();

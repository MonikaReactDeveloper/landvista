const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate';
    await mongoose.connect(mongoURL);
    console.log("✅ MongoDB Connected Successfully");
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
require("dotenv").config();
const mongoose = require("mongoose");
const Alert = require("./src/modules/alerts/alert.model");
const NotificationPreference = require("./src/modules/alerts/preferences.model");

const seedAlerts = [
  {
    title: "New Property Alert",
    message: "A new commercial plot has been added in Mumbai.",
    type: "info",
    category: "Property",
    isRead: false
  },
  {
    title: "Mandate Updated",
    message: "Your 'Green Valley' mandate status has changed to 'On Hold'.",
    type: "warning",
    category: "Mandate",
    isRead: false
  },
  {
    title: "Security Login",
    message: "A new login was detected from a new IP address.",
    type: "error",
    category: "System",
    isRead: true
  },
  {
    title: "Payment Successful",
    message: "Your subscription for 'Premium Intelligence' was successful.",
    type: "success",
    category: "Finance",
    isRead: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    await Alert.deleteMany({});
    console.log("Cleared old alerts.");

    await Alert.insertMany(seedAlerts);
    console.log("Alerts seeded successfully! 🚀");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

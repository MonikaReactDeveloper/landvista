require("dotenv").config();
const mongoose = require("mongoose");
const Role = require("./src/modules/rbac/role.model");

const seedRoles = [
  {
    name: "admin",
    description: "Full access to all system modules and user management.",
    permissions: ["READ_ALL", "WRITE_ALL", "DELETE_ALL", "MANAGE_USERS", "VIEW_AUDIT"]
  },
  {
    name: "investor",
    description: "Access to property listings, market intelligence, and mandates.",
    permissions: ["READ_PROPERTIES", "READ_INTELLIGENCE", "VIEW_OWN_MANDATES", "VIEW_DOCS"]
  },
  {
    name: "analyst",
    description: "Can view and create reports and market signals.",
    permissions: ["READ_INTELLIGENCE", "WRITE_INTELLIGENCE", "READ_PROPERTIES"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
    console.log("Connected to MongoDB...");

    await Role.deleteMany({});
    console.log("Cleared old roles.");

    await Role.insertMany(seedRoles);
    console.log("RBAC roles seeded successfully! 🛡️");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

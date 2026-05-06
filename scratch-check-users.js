const mongoose = require("mongoose");
const User = require("./src/modules/auth/auth.model");
const dotenv = require("dotenv");

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
        const users = await User.find({}, 'fullName email role status');
        console.log("PLATFORM USERS:");
        console.table(users.map(u => ({
            Name: u.fullName,
            Email: u.email,
            Role: u.role,
            Status: u.status
        })));
        await mongoose.disconnect();
    } catch (err) {
        console.error("Error:", err);
    }
};

checkUsers();

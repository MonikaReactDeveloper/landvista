const mongoose = require("mongoose");
const User = require("./src/modules/auth/auth.model");
const dotenv = require("dotenv");

dotenv.config();

const promoteUser = async (email) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/realestate");
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
        } else {
            user.role = "admin";
            user.status = "approved";
            user.isVerified = true;
            await user.save();
            console.log(`SUCCESS: User ${email} promoted to ADMIN and APPROVED.`);
        }
        await mongoose.disconnect();
    } catch (err) {
        console.error("Error:", err);
    }
};

promoteUser("suryanshnema12@gmail.com");

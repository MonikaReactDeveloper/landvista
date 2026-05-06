const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../src/modules/auth/auth.model');

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate');
        const user = await User.findOne({ email: 'suryanshnema12@gmail.com' });
        if (user) {
            console.log("--- USER FOUND ---");
            console.log("Email:", user.email);
            console.log("Role:", user.role);
            console.log("Status:", user.status);
            console.log("Verified:", user.isVerified);
            // Don't log password, but we can check it
            const isMatch = await user.comparePassword('admin1234');
            console.log("Password Match (admin1234):", isMatch);
            const isMatch2 = await user.comparePassword('Admin1234');
            console.log("Password Match (Admin1234):", isMatch2);
        } else {
            console.log("User suryanshnema12@gmail.com NOT found.");
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkUser();

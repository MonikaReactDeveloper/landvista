const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../src/modules/auth/auth.model');

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate');
        const user = await User.findOne({ email: 'suryanshnema12@gmail.com' });
        
        if (user) {
            user.password = 'admin1234';
            await user.save();
            console.log("Password for suryanshnema12@gmail.com has been reset to admin1234");
        } else {
            console.log("User suryanshnema12@gmail.com not found. Creating user...");
            const newUser = new User({
                fullName: "Suryansh Nema",
                email: "suryanshnema12@gmail.com",
                password: "admin1234",
                role: "admin",
                status: "approved",
                isVerified: true
            });
            await newUser.save();
            console.log("User suryanshnema12@gmail.com created with admin1234");
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

resetPassword();

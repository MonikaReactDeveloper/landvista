const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['registration', 'login', 'reset_password'],
        default: 'registration'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 } // 5 minutes
    }
});

module.exports = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

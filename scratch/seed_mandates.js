const mongoose = require('mongoose');
require('dotenv').config();

const Mandate = require('../src/modules/mandates/mandate.model');
const User = require('../src/modules/auth/auth.model');

const seedMandates = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate');
        console.log("Connected to MongoDB for seeding...");

        // Find an admin for ownership
        const admin = await User.findOne({ role: 'admin' });
        const adminId = admin ? admin._id : null;

        const sampleMandates = [
            {
                name: "Zone A Commercial Portfolio",
                organization: "Global Assets REIT",
                expectedValue: 45000000,
                dealScore: 85,
                dealGrade: "A",
                stage: "Qualified",
                owner: adminId,
                nextFollowUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now (Delayed)
                slaStatus: "Delayed",
                founderOverride: true
            },
            {
                name: "Residential Development Mandate",
                organization: "Urban Living Ltd",
                expectedValue: 12000000,
                dealScore: 60,
                dealGrade: "B",
                stage: "Conversation",
                owner: adminId,
                nextFollowUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                slaStatus: "On Track"
            },
            {
                name: "Industrial Hub Acquisition",
                organization: "Logistics Pro",
                expectedValue: 75000000,
                dealScore: 95,
                dealGrade: "A",
                stage: "Mandate",
                owner: adminId,
                nextFollowUpDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday (Breached)
                slaStatus: "Breached"
            },
            {
                name: "Retail Chain Expansion",
                organization: "MegaMart Group",
                expectedValue: 8000000,
                dealScore: 30,
                dealGrade: "C",
                stage: "Dropped",
                owner: adminId,
                dropOffReason: "Market conditions shifted; client withdrew interest.",
                nextFollowUpDate: new Date()
            }
        ];

        // Clear existing mandates if any (optional, but good for clean demo)
        // await Mandate.deleteMany({}); 

        await Mandate.insertMany(sampleMandates);
        console.log("✅ Sample Institutional Mandates seeded successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedMandates();

const mongoose = require('mongoose');
require('dotenv').config();

const AlertLog = require('../src/modules/alerts/alert-log.model');

const seedAlertLogs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/realestate');
        console.log("Connected to MongoDB for seeding alert logs...");

        const sampleLogs = [
            {
                category: "SLA",
                severity: "Critical",
                title: "Institutional SLA Breach",
                message: "Mandate 'Zone A Commercial Portfolio' has breached its follow-up SLA threshold (48h exceeded).",
                status: "Active",
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
            },
            {
                category: "Access",
                severity: "Warning",
                title: "New Access Request",
                message: "Institutional participant 'investor@blackstone.com' has requested Tier 3 platform access.",
                status: "Active",
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
            },
            {
                category: "NDA",
                severity: "Info",
                title: "NDA Executed",
                message: "User 'analyst@jll.com' has successfully signed NDA v2.4.",
                status: "Acknowledged",
                createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
            },
            {
                category: "Document",
                severity: "Critical",
                title: "Sensitive Document Access",
                message: "Tier 4 document 'Confidential_Valuation_Report.pdf' was accessed by 'admin@landvista.com'.",
                status: "Active",
                createdAt: new Date(Date.now() - 30 * 60 * 1000)
            }
        ];

        await AlertLog.insertMany(sampleLogs);
        console.log("✅ Sample Alert Logs seeded successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedAlertLogs();

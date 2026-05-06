const db = require('../src/config/db');
const Insight = require('../src/models/insightModel');

async function addMarketReports() {
    await db();
    try {
        const reports = [
            {
                title: "Mumbai Industrial Corridor Outlook - Q1 2024",
                slug: "mumbai-outlook-q1-2024",
                category: "Market Report",
                description: "A deep dive into pricing trends and occupancy rates across Mumbai's logistics hubs.",
                content: "Mumbai continues to dominate the industrial landscape. This report analyzes the 12% rental growth observed in the Bhiwandi and Panvel clusters...",
                image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a",
                region: "Mumbai",
                date: "April 2024"
            },
            {
                title: "Delhi-NCR Warehousing Report 2024",
                slug: "delhi-warehousing-2024",
                category: "Market Report",
                description: "Exploring the expansion of Grade A warehousing space in the NCR region.",
                content: "The NCR region has seen a surge in demand from 3PL and E-commerce players. New supply is being concentrated in the Gurgaon-Pataudi road...",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
                region: "Delhi",
                date: "March 2024"
            }
        ];

        for (const report of reports) {
            await Insight.updateOne({ slug: report.slug }, { $set: report }, { upsert: true });
        }
        console.log('Market Reports added successfully');
    } catch (err) {
        console.error('Failed to add reports:', err);
    }
    process.exit();
}

addMarketReports();

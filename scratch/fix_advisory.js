const db = require('../src/config/db');
const { Advisory } = require('../src/modules/advisory/advisory.model');

async function fixAdvisory() {
    await db();
    try {
        const fullData = {
            title: "Strategic Industrial Advisory",
            subtitle: "Navigating the complexities of large-scale land acquisition.",
            description: "Our expert team provides deep-dive analysis and strategic planning for industrial expansion and government land allocation.",
            detail: "We cover everything from initial feasibility studies to final legal closure, ensuring a smooth path for your institutional investments.",
            categories: [
                {
                    title: "Land Valuation",
                    subtitle: "Market-driven pricing",
                    description: "Accurate real-time valuation of industrial plots across major corridors using proprietary data models."
                },
                {
                    title: "Regulatory Compliance",
                    subtitle: "Zero-risk legal path",
                    description: "Ensuring all zoning laws, environmental clearances, and government mandates are met before purchase."
                },
                {
                    title: "Government Liaison",
                    subtitle: "Direct Channel",
                    description: "Facilitating smooth communication with nodal agencies for faster land allotment and approvals."
                }
            ],
            bannerImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            isActive: true
        };

        // Create a fresh, perfect record
        await Advisory.create(fullData);
        console.log('✅ Advisory data fixed with 3 complete categories');
    } catch (err) {
        console.error('Fix failed:', err);
    }
    process.exit();
}

fixAdvisory();

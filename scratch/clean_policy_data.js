const db = require('../src/config/db');
const { Zone, PolicyDocument } = require('../src/modules/policy/policy.model');

async function cleanAndPopulate() {
    await db();
    try {
        // 1. CLEAR OLD DATA
        console.log('Cleaning old policy data...');
        await Zone.deleteMany({});
        await PolicyDocument.deleteMany({});

        // 2. ADD CLEAN ZONES
        const zones = [
            {
                name: "Navi Mumbai Industrial Corridor",
                description: "Strategically positioned with access to JNPT port and the new international airport. High demand for warehousing and logistics.",
                type: "Industrial",
                location: "Navi Mumbai, Maharashtra",
                area: "450 sq km",
                imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
            },
            {
                name: "Gurugram Tech-Industrial Zone",
                description: "Focusing on electronics manufacturing and R&D centers. Excellent connectivity to Delhi and KMP expressway.",
                type: "Mixed Use / Tech",
                location: "Gurugram, Haryana",
                area: "320 sq km",
                imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5"
            },
            {
                name: "Bengaluru Logistics Park",
                description: "Major hub for e-commerce fulfillment centers and hardware tech parks near the international airport.",
                type: "Logistics",
                location: "Bengaluru, Karnataka",
                area: "210 sq km",
                imageUrl: "https://images.unsplash.com/photo-1582733732697-a89710f85da9"
            }
        ];

        for (const zone of zones) {
            const z = new Zone(zone);
            await z.save();
        }
        console.log('✅ Clean Intelligence Zones populated.');

        // 3. ADD POLICY DOCUMENTS
        const docs = [
            {
                title: "Land Use Policy 2024 - Industrial Guidelines",
                description: "Official guidelines for land acquisition and usage in industrial corridors.",
                category: "Land Use",
                fileUrl: "https://example.com/policy2024.pdf"
            }
        ];
        await PolicyDocument.insertMany(docs);
        console.log('✅ Clean Policy Documents populated.');

    } catch (err) {
        console.error('Clean population failed:', err);
    }
    process.exit();
}

cleanAndPopulate();

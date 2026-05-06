const db = require('../src/config/db');
const { Zone, PolicyDocument, PolicyUpdate } = require('../src/modules/policy/policy.model');

async function populatePolicyData() {
    await db();
    try {
        // 1. Add Zones
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
            }
        ];

        for (const zData of zones) {
            let z = await Zone.findOne({ name: zData.name });
            if (!z) {
                z = new Zone(zData);
            } else {
                Object.assign(z, zData);
            }
            await z.save();
            console.log('Saved Zone:', z.name);
        }

        // 2. Add Policy Documents
        const docs = [
            {
                title: "Land Use Policy 2024 - Industrial Guidelines",
                description: "Official guidelines for land acquisition and usage in industrial corridors.",
                category: "Land Use",
                fileUrl: "https://example.com/policy2024.pdf"
            },
            {
                title: "Incentives for Data Center Parks",
                description: "Framework for subsidies and tax exemptions for IT/ITeS parks.",
                category: "Technology",
                fileUrl: "https://example.com/datacenters.pdf"
            }
        ];

        for (const dData of docs) {
            let d = await PolicyDocument.findOne({ title: dData.title });
            if (!d) {
                d = new PolicyDocument(dData);
            } else {
                Object.assign(d, dData);
            }
            await d.save();
            console.log('Saved PolicyDoc:', d.title);
        }

        console.log('Policy & Zone data populated successfully');
    } catch (err) {
        console.error('Population failed:', err);
    }
    process.exit();
}

populatePolicyData();

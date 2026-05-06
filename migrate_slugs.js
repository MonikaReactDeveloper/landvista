const mongoose = require('mongoose');
require('dotenv').config();
const Zone = require('./src/modules/zones/zone.model');
const Sector = require('./src/modules/zones/sector.model');

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
        
        const zones = await Zone.find();
        const zoneMap = {};
        for (let z of zones) {
            z.slug = z.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            if (!z.code) z.code = "ZONE-" + Math.floor(1000 + Math.random() * 9000);
            await z.save();
            zoneMap[z.name] = z._id;
        }
        console.log(`Updated ${zones.length} zones with slugs`);

        const sectors = await Sector.find();
        for (let s of sectors) {
            // Fix slug
            s.slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            if (!s.code) s.code = "SEC-" + Math.floor(1000 + Math.random() * 9000);
            
            // Fix zone ref if it's a string name
            if (typeof s.zone === 'string' && zoneMap[s.zone]) {
                s.zone = zoneMap[s.zone];
            } else if (typeof s.zone === 'string') {
                // If zone name doesn't exist, assign a default or leave it
                console.warn(`Sector ${s.name} has invalid zone name: ${s.zone}`);
            }

            try {
                await s.save();
            } catch (saveErr) {
                // If it still fails, update directly via collection to bypass validation
                await mongoose.connection.collection('sectors').updateOne(
                    { _id: s._id },
                    { $set: { slug: s.slug, code: s.code, zone: typeof s.zone === 'string' ? null : s.zone } }
                );
            }
        }
        console.log(`Updated ${sectors.length} sectors with slugs`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

migrate();

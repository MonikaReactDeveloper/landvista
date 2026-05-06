const mongoose = require('mongoose');
require('dotenv').config();
const Zone = require('./src/modules/zones/zone.model');
const Sector = require('./src/modules/zones/sector.model');

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
        
        const resZone = await Zone.updateMany(
            { status: { $exists: false } }, 
            { $set: { status: 'Active' } }
        );
        console.log(`Updated ${resZone.modifiedCount} zones`);

        const resSector = await Sector.updateMany(
            { status: { $exists: false } }, 
            { $set: { status: 'Active' } }
        );
        console.log(`Updated ${resSector.modifiedCount} sectors`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

migrate();

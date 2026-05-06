const db = require('../src/config/db');
const { Advisory } = require('../src/modules/advisory/advisory.model');

async function checkAdvisory() {
    await db();
    try {
        const data = await Advisory.find();
        console.log('ADVISORY DATA ->', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Check failed:', err);
    }
    process.exit();
}

checkAdvisory();

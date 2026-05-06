const db = require('../src/config/db');
const Insight = require('../src/models/insightModel');

async function fixBrokenImage() {
    await db();
    try {
        await Insight.updateOne(
            { title: 'Top Land Investment Zones 2024' }, 
            { $set: { image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd' } }
        );
        console.log('Image fixed successfully');
    } catch (err) {
        console.error('Fix failed:', err);
    }
    process.exit();
}

fixBrokenImage();

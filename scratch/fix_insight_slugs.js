const db = require('../src/config/db');
const Insight = require('../src/models/insightModel');

async function fixInsightSlugs() {
    await db();
    try {
        const insights = await Insight.find();
        for (const i of insights) {
            if (!i.slug) {
                const slug = i.title.toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '');
                await Insight.updateOne({ _id: i._id }, { $set: { slug: slug } });
                console.log('Added slug for:', i.title, '->', slug);
            }
        }
        console.log('Database insight slugs fixed successfully');
    } catch (err) {
        console.error('Fix failed:', err);
    }
    process.exit();
}

fixInsightSlugs();

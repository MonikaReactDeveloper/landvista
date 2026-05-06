const db = require('../src/config/db');
const Service = require('../src/models/serviceModel');

async function fixSlugs() {
    await db();
    try {
        const services = await Service.find();
        for (const s of services) {
            if (!s.slug) {
                const slug = s.title.toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '');
                await Service.updateOne({ _id: s._id }, { $set: { slug: slug } });
                console.log('Added slug for:', s.title, '->', slug);
            }
        }
        console.log('Database slugs fixed successfully');
    } catch (err) {
        console.error('Fix failed:', err);
    }
    process.exit();
}

fixSlugs();

const db = require('../src/config/db');
const Service = require('../src/models/serviceModel');

async function updateImages() {
    await db();
    try {
        await Service.updateOne(
            { title: 'Legal Title Verification 2' }, 
            { $set: { image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f' } }
        );
        await Service.updateOne(
            { title: 'Master Planning & Design' }, 
            { $set: { image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' } }
        );
        console.log('Database images updated successfully');
    } catch (err) {
        console.error('Update failed:', err);
    }
    process.exit();
}

updateImages();

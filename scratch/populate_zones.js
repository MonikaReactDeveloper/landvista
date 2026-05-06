const db = require('../src/config/db');
const Insight = require('../src/models/insightModel');

async function populateInvestmentZones() {
    await db();
    try {
        await Insight.updateOne(
            { title: 'Top Land Investment Zones 2024' }, 
            { $set: { 
                description: 'Identifying the most promising regions for land investment based on policy shifts and infrastructure growth.',
                content: 'As we navigate through 2024, certain geographic clusters are emerging as high-yield investment zones. The development of new Multi-Modal Logistics Parks (MMLPs) and Dedicated Freight Corridors (DFCs) is significantly increasing the capital appreciation potential of nearby land parcels.\n\nKey zones to watch include the Western Industrial Corridor and the emerging tech hubs in Southern India. Investors are advised to focus on "Policy-Aligned" assets where state-level incentives for data centers and warehousing are most aggressive. This insight provides a heatmap of these zones and a detailed breakdown of the regulatory tailwinds driving their value.',
                image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5'
            } }
        );
        console.log('Investment Zones updated successfully');
    } catch (err) {
        console.error('Update failed:', err);
    }
    process.exit();
}

populateInvestmentZones();

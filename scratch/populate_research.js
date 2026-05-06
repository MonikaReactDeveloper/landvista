const db = require('../src/config/db');
const Insight = require('../src/models/insightModel');

async function populateResearch() {
    await db();
    try {
        await Insight.updateOne(
            { title: 'Latest Research' }, 
            { $set: { 
                description: 'A comprehensive analysis of the 2024 industrial land market trends across India.',
                content: 'The 2024 industrial land market has shown remarkable resilience and growth. Driven by the "Make in India" initiative and the expansion of the e-commerce logistics sector, demand for Grade A industrial space has reached record highs.\n\nOur research indicates a 15% year-on-year increase in land acquisition costs in primary corridors. However, secondary markets are offering lucrative opportunities for long-term investors. This report covers the shift towards sustainable industrial design and the impact of new zoning policies on market valuation.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
            } }
        );
        console.log('Latest Research updated successfully');
    } catch (err) {
        console.error('Update failed:', err);
    }
    process.exit();
}

populateResearch();

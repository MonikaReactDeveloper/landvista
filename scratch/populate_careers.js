const db = require('../src/config/db');
const Career = require('../src/modules/careers/career.model');

async function populateCareers() {
    await db();
    try {
        const jobs = [
            {
                title: "Senior Land Research Analyst",
                department: "Research",
                location: "Mumbai / Remote",
                type: "Full-time",
                description: "We are looking for a data-driven analyst to lead our industrial corridor research. You will be responsible for identifying emerging land trends and policy shifts.",
                requirements: ["5+ years in Real Estate Research", "Proficiency in GIS tools", "Strong analytical skills"],
                experience: "5-7 years"
            },
            {
                title: "Backend Developer (Node.js)",
                department: "Technology",
                location: "Remote",
                type: "Full-time",
                description: "Join our tech team to build the next generation of land intelligence tools. You will be responsible for building secure, scalable APIs.",
                requirements: ["Strong Node.js/Express skills", "MongoDB experience", "Understanding of RBAC and security"],
                experience: "2-4 years"
            },
            {
                title: "Research Intern",
                department: "Research",
                location: "Mumbai",
                type: "Internship",
                description: "Perfect for students interested in urban planning and data science. Assist our senior analysts in data collection and mapping.",
                requirements: ["Interest in Urban Planning", "Good writing skills", "Available for 3 months"],
                experience: "0-1 year"
            }
        ];

        for (const job of jobs) {
            await Career.updateOne({ title: job.title }, { $set: job }, { upsert: true });
        }

        console.log('Careers data populated successfully');
    } catch (err) {
        console.error('Population failed:', err);
    }
    process.exit();
}

populateCareers();

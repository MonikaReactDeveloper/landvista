const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

const demoData = {
  // ─── HOME MODULE ──────────────────────────────────────────────────────────
  siteSettings: {
    siteName: "LandVista",
    heroTitle: "Structured Intelligence Platform",
    heroSubtitle: "Controlled access system with decision-support infrastructure for smarter real estate investments.",
    contactEmail: "info@landvista.com",
    contactPhone: "+91-9999999999",
    socialLinks: {
      linkedin: "https://linkedin.com/company/landvista",
      twitter: "https://twitter.com/landvista"
    }
  },
  trustMetrics: [
    { label: "Security Score", value: "85", description: "System reliability index", order: 1 },
    { label: "Successful Deals", value: "1,200+", description: "Land transactions completed", order: 2 },
    { label: "Active Investors", value: "500+", description: "Global partnership network", order: 3 }
  ],

  // ─── ADVISORY MODULE ──────────────────────────────────────────────────────
  advisoryPage: {
    title: "Expert Advisory Services",
    subtitle: "Strategic guidance for high-value investments",
    description: "We provide end-to-end advisory for real estate acquisition, legal due diligence, and financial planning."
  },
  serviceCategories: [
    { name: "Legal", description: "Legal due diligence and land documentation", order: 1 },
    { name: "Financial", description: "Investment analysis and ROI planning", order: 2 }
  ],
  advisoryServices: [
    { name: "Land Acquisition Advisory", category: "Legal", price: 5000, duration: "1 month", status: "active" },
    { name: "Portfolio Strategy", category: "Financial", price: 8000, duration: "2 weeks", status: "active" }
  ],

  // ─── POLICY MODULE ────────────────────────────────────────────────────────
  zones: [
    { name: "Industrial Zone A", type: "Industrial", location: "North Mumbai", area: "500 sq km" },
    { name: "Coastal Tech Zone", type: "Tech Park", location: "Pune South", area: "200 sq km" }
  ],
  sectors: [
    { name: "Agriculture", code: "SEC-001", zone: "Industrial Zone A" },
    { name: "Renewable Energy", code: "SEC-054", zone: "Coastal Tech Zone" }
  ],
  policyDocuments: [
    { title: "Land Use Policy 2024", category: "Land Use", description: "Official 2024 guidelines" }
  ],
  policyUpdates: [
    { title: "New Zoning Regulations", summary: "Recent shifts in industrial zoning", category: "Zoning" }
  ],

  // ─── INTELLIGENCE MODULE ──────────────────────────────────────────────────
  intelligencePreview: {
    title: "Market Intelligence",
    subtitle: "Data-driven insights",
    description: "Real-time analytics for the modern investor.",
    category: "Analytics",
    highlights: ["AI Insights", "Predictive Modeling", "Real-time Data"]
  },
  intelligenceInsights: [
    { 
      title: "Real Estate Trends 2024", 
      slug: "real-estate-trends-2024", 
      summary: "Market shifts in 2024", 
      author: "LandVista Team",
      category: "Market Analysis"
    }
  ]
};

async function seed() {
  console.log("🚀 Starting Demo Seeding...");

  try {
    // 1. Home
    await axios.post(`${BASE_URL}/home/site-settings`, demoData.siteSettings);
    for (const item of demoData.trustMetrics) await axios.post(`${BASE_URL}/home/trust-metrics`, item);
    console.log("✅ Home Module Seeded");

    // 2. Advisory
    await axios.post(`${BASE_URL}/advisory`, demoData.advisoryPage);
    for (const item of demoData.serviceCategories) await axios.post(`${BASE_URL}/advisory/service-categories`, item);
    for (const item of demoData.advisoryServices) await axios.post(`${BASE_URL}/advisory/services`, item);
    console.log("✅ Advisory Module Seeded");

    // 3. Policy
    for (const item of demoData.zones) await axios.post(`${BASE_URL}/policy/zones`, item);
    for (const item of demoData.sectors) await axios.post(`${BASE_URL}/policy/sectors`, item);
    await axios.post(`${BASE_URL}/policy/policy-documents`, demoData.policyDocuments[0]);
    await axios.post(`${BASE_URL}/policy/policy-updates`, demoData.policyUpdates[0]);
    console.log("✅ Policy Module Seeded");

    // 4. Intelligence
    await axios.post(`${BASE_URL}/intelligence/intelligence-preview`, demoData.intelligencePreview);
    for (const item of demoData.intelligenceInsights) await axios.post(`${BASE_URL}/intelligence/insights`, item);
    console.log("✅ Intelligence Module Seeded");

    console.log("\n✨ DATABASE SEEDED SUCCESSFULLY! YOU CAN NOW SHOW THE CLIENT! ✨");
  } catch (err) {
    console.error("❌ Seeding failed. Make sure the server is running on port 3000!");
    console.error(err.message);
  }
}

seed();

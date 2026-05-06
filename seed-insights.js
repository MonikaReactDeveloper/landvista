const axios = require('axios');

const insightsData = [
  {
    title: "Latest Research",
    summary: "Explore our most recent data and market findings.",
    category: "Latest Research",
    subItems: [
      { name: "Market Reports", link: "/research/market-reports" }
    ]
  },
  {
    title: "Trending Topics",
    summary: "The topics defining the real estate market today.",
    category: "Trending Topics",
    subItems: [
      { name: "The Weekly Take Podcast", link: "/insights/podcast" },
      { name: "Our Take Newsletter", link: "/insights/newsletter" },
      { name: "Sustainability", link: "/insights/sustainability" },
      { name: "Total Cost of Occupancy", link: "/insights/tco" },
      { name: "Data Center", link: "/insights/data-center" }
    ]
  },
  {
    title: "Featured Insights",
    summary: "Curated research selected by our experts.",
    category: "Featured Insights",
    subItems: [
      { name: "Intelligent Investment", link: "/insights/intelligent-investment" },
      { name: "Future Cities", link: "/insights/future-cities" },
      { name: "Adaptive Spaces", link: "/insights/adaptive-spaces" },
      { name: "Evolving Workforces", link: "/insights/evolving-workforces" },
      { name: "Creating Resilience", link: "/insights/creating-resilience" }
    ]
  },
  {
    title: "Our Take Newsletter",
    summary: "Our unmatched research and thought leadership platform delivers actionable insights to help our clients make informed business decisions.",
    category: "Promo",
    image: "https://www.cbre.com/-/media/cbre/insights/features/our-take-newsletter/ourtake_promo_image.jpg",
    subItems: [
      { name: "Learn More", link: "/insights/newsletter" }
    ]
  }
];

async function seedInsights() {
  console.log("Starting to seed Insights Database...");
  for (const item of insightsData) {
    try {
      const resp = await axios.post('http://localhost:3000/api/insights', item);
      console.log(`✅ Passed: ${resp.data.title}`);
    } catch (e) {
      console.error(`❌ Failed: ${item.title}`);
    }
  }
  console.log("Database seeded successfully!");
}

seedInsights();

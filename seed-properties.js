const axios = require('axios');

const propertiesData = [
  {
    title: "Properties",
    summary: "Find the ideal office, industrial or retail property for your team or source specialized spaces for multifamily, healthcare, technology and more. Let us guide you to your next investment or leasing opportunity.",
    category: "Overview",
    subItems: [
      { name: "Overview", link: "/properties/overview" }
    ]
  },
  {
    title: "For Lease",
    summary: "View active lease listings.",
    category: "For Lease",
    subItems: [
      { name: "Properties for Lease", link: "/properties/lease" }
    ]
  },
  {
    title: "For Sale",
    summary: "View properties available for sale.",
    category: "For Sale",
    subItems: [
      { name: "Properties for Sale", link: "/properties/sale" },
      { name: "Investment Properties for Sale", link: "/properties/investment-sales" }
    ]
  }
];

async function seedProperties() {
  console.log("Starting to seed Properties Database...");
  for (const item of propertiesData) {
    try {
      // Note: We use the new /api/properties endpoint
      const resp = await axios.post('no', item);
      console.log(`✅ Passed: ${resp.data.title}`);
    } catch (e) {
      console.error(`❌ Failed: ${item.title}`);
    }
  }
  console.log("Database seeded successfully!");
}

seedProperties();

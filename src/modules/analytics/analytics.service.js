const User = require("../auth/auth.model");
const Mandate = require("../mandates/mandate.model");

const getInstitutionalAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const approvedUsers = await User.countDocuments({ status: "approved" });
  const tier3PlusUsers = await User.countDocuments({ tier: { $in: ["Tier 3", "Tier 4"] } });
  
  const totalMandates = await Mandate.countDocuments();
  const onTrackMandates = await Mandate.countDocuments({ slaStatus: "On Track" });
  const gradeAMandates = await Mandate.countDocuments({ dealGrade: "A" });

  // 1. PQI (Profile Quality Index) - Scale 0-5
  // Measures the proportion of high-tier qualified institutional participants
  const pqi = totalUsers > 0 ? (tier3PlusUsers / totalUsers) * 5 : 0;

  // 2. EDI (Engagement Discipline Index) - Scale 0-5
  // Measures adherence to SLAs and follow-up discipline
  const edi = totalMandates > 0 ? (onTrackMandates / totalMandates) * 5 : 0;

  // 3. PI (Pipeline Intensity) - Scale 0-5
  // Measures the concentration of high-grade (Grade A) strategic mandates
  const pi = totalMandates > 0 ? (gradeAMandates / totalMandates) * 5 : 0;

  // 4. Conversion Rate
  const conversionRate = totalUsers > 0 ? (approvedUsers / totalUsers) * 100 : 0;

  // 5. Forecast (Simple Growth Logic)
  // Calculate mandates created in last 30 days
  const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentMandates = await Mandate.countDocuments({ createdAt: { $gte: lastMonth } });
  
  return {
    totalUsers,
    approvedUsers,
    totalMandates,
    pqi: parseFloat(pqi.toFixed(2)),
    edi: parseFloat(edi.toFixed(2)),
    pi: parseFloat(pi.toFixed(2)),
    conversionRate: parseFloat(conversionRate.toFixed(2)),
    recentMandates,
    engagementScore: Math.round((pqi + edi + pi) / 15 * 100),
    mostViewedZones: [
      { name: "Special Economic Zone A", views: 1240 }, // Mocked as we don't have zone view tracking yet
      { name: "Industrial Corridor West", views: 980 },
      { name: "IT Park Sector 4", views: 850 }
    ]
  };
};

module.exports = {
  getInstitutionalAnalytics
};

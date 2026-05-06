const { TrustMetric, SiteSettings } = require("./home.model");
const Insight = require("../../models/insightModel");

// ─── GET /api/home ────────────────────────────────────────────────────────────
const getHomeData = async () => {
  const [settings, trustMetrics, featuredInsights] = await Promise.all([
    SiteSettings.findOne(),
    TrustMetric.find({ isActive: true }).sort({ order: 1 }),
    Insight.find({ category: "Featured Insights" }).sort({ createdAt: -1 }).limit(6),
  ]);
  return { settings, trustMetrics, featuredInsights };
};

// ─── GET /api/home/trust-metrics ─────────────────────────────────────────────
const getTrustMetrics = async () => {
  return await TrustMetric.find({ isActive: true }).sort({ order: 1 });
};

// ─── POST /api/home/trust-metrics ────────────────────────────────────────────
const createTrustMetric = async (body) => {
  const metric = new TrustMetric(body); // iconUrl comes directly in body as a URL string
  return await metric.save();
};

// ─── GET /api/home/featured-insights ─────────────────────────────────────────
const getFeaturedInsights = async () => {
  return await Insight.find({ category: "Featured Insights" })
    .sort({ createdAt: -1 })
    .limit(6);
};

// ─── GET /api/home/site-settings ─────────────────────────────────────────────
const getSiteSettings = async () => {
  return await SiteSettings.findOne();
};

// ─── POST /api/home/site-settings ─────────────────────────────────────────────
// Uses findOneAndUpdate with upsert so there's always only 1 settings document
const createOrUpdateSiteSettings = async (body) => {
  return await SiteSettings.findOneAndUpdate(
    {},        // match any existing document
    body,
    { new: true, upsert: true, runValidators: true }
  );
};

const updateTrustMetric = async (id, body) => {
  return await TrustMetric.findByIdAndUpdate(id, body, { new: true, runValidators: true });
};

const deleteTrustMetric = async (id) => {
  return await TrustMetric.findByIdAndDelete(id);
};

module.exports = {
  getHomeData,
  getTrustMetrics,
  createTrustMetric,
  updateTrustMetric,
  deleteTrustMetric,
  getFeaturedInsights,
  getSiteSettings,
  createOrUpdateSiteSettings,
};

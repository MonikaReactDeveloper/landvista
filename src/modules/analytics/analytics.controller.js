const analyticsService = require("./analytics.service");

const getAnalytics = async (req, res) => {
  try {
    const data = await analyticsService.getInstitutionalAnalytics();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAnalytics
};

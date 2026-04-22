const Insight = require('../models/insightModel');

// Create a new insight
exports.createInsight = async (req, res) => {
  try {
    const insight = new Insight(req.body);
    await insight.save();
    res.status(201).json(insight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all insights
exports.getInsights = async (req, res) => {
  try {
    const insights = await Insight.find();
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single insight by ID
exports.getInsightById = async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.id);
    if (!insight) return res.status(404).json({ error: 'Insight not found' });
    res.json(insight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an insight
exports.updateInsight = async (req, res) => {
  try {
    const insight = await Insight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!insight) return res.status(404).json({ error: 'Insight not found' });
    res.json(insight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an insight
exports.deleteInsight = async (req, res) => {
  try {
    const insight = await Insight.findByIdAndDelete(req.params.id);
    if (!insight) return res.status(404).json({ error: 'Insight not found' });
    res.json({ message: 'Insight deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const express = require('express');
const router = express.Router();
const insightController = require('../controllers/insightController');

router.post('/', insightController.createInsight);
router.get('/', insightController.getInsights);
router.get('/:id', insightController.getInsightById);
router.put('/:id', insightController.updateInsight);
router.delete('/:id', insightController.deleteInsight);

module.exports = router;

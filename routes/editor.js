const express = require('express');
const editorController = require('../src/controllers/editorController');
const router = express.Router();

router.post('/letter_of_recommendation/generate', editorController.letterOfRecommendationGenerate);
router.post('/letter_of_recommendation/evaluate', editorController.letterOfRecommendationEvaluate);
router.post('/essay/structure/generate', editorController.essayStructureGenerate);
router.post('/essay/generate', editorController.essayGenerate);
router.post('/essay/evaluate', editorController.essayEvaluate);

module.exports = router;

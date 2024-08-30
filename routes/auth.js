const express = require('express');
const router = express.Router();
const authController = require('../src/controllers/authController');

router.get('/magic-link-generation', authController.magicLinkGeneration);
router.get('/verify-token',authController.verifyToken);

module.exports = router;
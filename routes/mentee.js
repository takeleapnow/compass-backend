const express = require('express');
const router = express.Router();

const menteeController = require("../src/controllers/menteeController")

router.post("/mentee",menteeController.createMentee)

module.exports = router
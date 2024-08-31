const express = require('express');
const router = express.Router();

const menteeController = require("../src/controllers/menteeController")

router.post("/createMentee",menteeController.createMentee)
router.put("/updateMentee",menteeController.updateMentee)
router.delete("/getMentee",menteeController.getMenteeById)

module.exports = router
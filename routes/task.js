const express = require('express');
const taskController = require('../src/controllers/taskController');
const router = express.Router();

router.post('/creatTask', taskController.createTask);
router.put('/updateTask', taskController.updateTask);
router.get('/getTask', taskController.getTaskById);
router.get('/getTaskApp', taskController.getTasksByApplicationId);
router.post('/addTaskToApplication',taskController.addTaskToApplication)
router.get('/getByMenteeID',taskController.getTasksByMenteeId)

module.exports = router;

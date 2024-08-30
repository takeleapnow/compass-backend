const express = require('express');
const taskController = require('../src/controllers/taskController');
const router = express.Router();

router.post('/creatTask', taskController.createTask);
router.put('/updateTask/:id', taskController.updateTask);
router.get('/getTask/:id', taskController.getTaskById);
router.get('/getTaskApp/:application_id', taskController.getTasksByApplicationId);
router.post('/addTaskToApplication',taskController.addTaskToApplication)
router.get('/getByMenteeID',taskController.getTasksByMenteeId)

module.exports = router;

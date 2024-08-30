const db = require('../db'); // Supabase client
const Task = require('../models/task');
const Application = require('../models/application');

// Create a new task
async function createTask(req, res) {
    try {
        const taskData = new Task(req.body);
        const task = await taskData.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const { taskId } = req.params;
        const updatedData = req.body;  // Task data to be updated

        // Fetch the existing task
        const existingTask = await Task.getById(taskId);
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the task with new data
        const updatedTask = new Task({ ...existingTask, ...updatedData });
        const result = await updatedTask.update();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a task by ID
async function getTaskById(req, res) {
    try {
        const { id } = req.params;
        const task = await Task.getById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ error: 'Task not found' });
    }
}

// Get all tasks for a specific application
async function getTasksByApplicationId(req, res) {
    try {
        const { application_id } = req.params;
        const tasks = await Task.getByApplicationId(application_id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addTaskToApplication(req, res) {
    try {
        const { applicationId } = req.params;
        const taskData = req.body;  // Task data

        // Ensure the application exists
        const application = await Application.getById(applicationId);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Create a new task with the application ID
        const task = new Task({ ...taskData, application_id: applicationId });
        const savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTasksByMenteeId(req, res) {
    try {
        // const { mentee_id } = req.params;
        // const id = Number(mentee_id);
        const { mentee_id } = req.body

        // if (isNaN(mentee_id)) {
        //     return res.status(400).json({ error: 'Invalid mentee_id format' });
        // }
        console.log(mentee_id)
        const tasks = await Task.getByMenteeId(mentee_id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    updateTask,
    getTaskById,
    getTasksByApplicationId,
    addTaskToApplication,
    getTasksByMenteeId
};

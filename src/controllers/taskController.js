const db = require('../db');
const Task = require('../models/task');
const Application = require('../models/Application');

// Create a new task for an application
async function createTask(req, res) {
    try {
        const { application_id, taskData } = req.body;

        // Ensure the application exists
        const application = await Application.getById(application_id);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Create a new task linked to the application
        const task = new Task({ ...taskData, application_id });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an existing task by task ID
async function updateTask(req, res) {
    try {
        const { taskId, updatedData } = req.body;

        if (typeof taskId !== 'number') {
            return res.status(400).json({ error: 'Invalid taskId format' });
        }

        // Fetch the existing task
        const existingTask = await Task.getById(taskId);
        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the task with new data (only the provided fields)
        const updatedTask = new Task({ ...existingTask, ...updatedData });
        const result = await updatedTask.update(taskId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a task by task ID
async function getTaskById(req, res) {
    try {
        const { taskId } = req.params;
        const task = await Task.getById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all tasks related to a specific application
async function getTasksByApplicationId(req, res) {
    try {
        const { application_id } = req.params;
        const tasks = await Task.getByApplicationId(application_id);
        if (!tasks.length) {
            return res.status(404).json({ error: 'No tasks found for this application' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a new task to an existing application
async function addTaskToApplication(req, res) {
    try {
        const { application_id, taskData } = req.body;

        // Ensure the application exists
        const application = await Application.getById(application_id);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Create and link the task to the application
        const task = new Task({ ...taskData, application_id });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get tasks associated with a specific mentee
async function getTasksByMenteeId(req, res) {
    try {
        const { mentee_id } = req.params;

        // Fetch tasks associated with the mentee
        const tasks = await Task.getByMenteeId(mentee_id);
        if (!tasks.length) {
            return res.status(404).json({ error: 'No tasks found for this mentee' });
        }
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
    getTasksByMenteeId,
};

const db = require('../db'); // Supabase client
const Application = require('../models/application');
const Task = require('../models/task');

async function createApplication(req, res) {
    try {
        // Ensure request body contains necessary data
        const applicationData = req.body;
        if (!applicationData || typeof applicationData !== 'object') {
            return res.status(400).json({ error: 'Invalid application data' });
        }

        // Initialize Application model with the request body
        const application = new Application(applicationData);

        // Save the application to the database
        const result = await application.save();

        // Respond with the created application
        res.status(201).json(result);
    } catch (error) {
        // Handle errors during the save operation
        console.error('Error creating application:', error); // For debugging
        res.status(500).json({ error: error.message });
    }
}

// Update an existing application
// async function updateApplication(req, res) {
//     try {
//         const { id } = req.params;
//         const applicationData = new Application(req.body);
//         const updatedApplication = await applicationData.update(id);
//         res.status(200).json(updatedApplication);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }


// Update an existing application
async function updateApplication(req, res) {
    try {
        const { applicationId, updateData } = req.params;
        
        // Fetch the existing application data from the database
        const existingApplication = await Application.getById(applicationId);
        if (!existingApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Merge the existing data with the new data from req.body
        const updatedData = {
            ...existingApplication,
            ...updateData,  // This will override only the provided fields
        };

        // Create a new Application instance with the merged data
        const applicationData = new Application(updatedData);
        const updatedApplication = await applicationData.update(id);
        
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Get an application by ID
async function getApplicationById(req, res) {
    try {
        const { id } = req.params;
        const application = await Application.getById(id);
        res.status(200).json(application);
    } catch (error) {
        res.status(404).json({ error: 'Application not found' });
    }
}

// Get all applications
async function getAllApplications(req, res) {
    try {
        const applications = await Application.getAll();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an application by ID
async function deleteApplication(req, res) {
    try {
        const { id } = req.body;
        await Application.deleteById(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTasksForApplication(req, res) {
    try {
        const { applicationId } = req.body;
        const tasks = await Task.getByApplicationId(applicationId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getApplicationsByMentee(req, res) {
    try {
        const { menteeId } = req.body;
        const applications = await Application.getByMenteeId(menteeId);

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createApplication,
    updateApplication,
    getApplicationById,
    getAllApplications,
    deleteApplication,
    getTasksForApplication,
    getApplicationsByMentee
};

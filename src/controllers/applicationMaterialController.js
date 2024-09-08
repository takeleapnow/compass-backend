const ApplicationMaterial = require('../models/applicationMaterial');

const db = getDB();

// Controller to create a new application material
async function createApplicationMaterial(req, res) {
    try {
        const materialData = new ApplicationMaterial(req.body);  // Create a new instance with request body
        const savedMaterial = await materialData.save();  // Save to database
        res.status(201).json(savedMaterial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller to update an existing application material
async function updateApplicationMaterial(req, res) {
    try {
        const { id, materialData } = req.body;  // Get ID and updated data from body
        const existingMaterial = await ApplicationMaterial.getByApplicationId(materialData.application_id);
        
        if (!existingMaterial) {
            return res.status(404).json({ error: 'Application material not found' });
        }

        const updatedMaterial = new ApplicationMaterial({ ...existingMaterial[0], ...materialData });  // Merge existing data with updated data
        const result = await updatedMaterial.update(id);  // Update in database
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controller to fetch application materials by application ID
async function getApplicationMaterials(req, res) {
    try {
        const { application_id } = req.params;  // Get application ID from params
        const materials = await ApplicationMaterial.getByApplicationId(application_id);  // Fetch from database
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createApplicationMaterial,
    updateApplicationMaterial,
    getApplicationMaterials
};

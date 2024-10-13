// const ApplicationMaterial = require('../models/applicationMaterial');

// const db = getDB();

// // Controller to create a new application material
// async function createApplicationMaterial(req, res) {
//     try {
//         const materialData = new ApplicationMaterial(req.body);  // Create a new instance with request body
//         const savedMaterial = await materialData.save();  // Save to database
//         res.status(201).json(savedMaterial);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Controller to update an existing application material
// async function updateApplicationMaterial(req, res) {
//     try {
//         const { id, materialData } = req.body;  // Get ID and updated data from body
//         const existingMaterial = await ApplicationMaterial.getByApplicationId(materialData.application_id);
        
//         if (!existingMaterial) {
//             return res.status(404).json({ error: 'Application material not found' });
//         }

//         const updatedMaterial = new ApplicationMaterial({ ...existingMaterial[0], ...materialData });  // Merge existing data with updated data
//         const result = await updatedMaterial.update(id);  // Update in database
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Controller to fetch application materials by application ID
// async function getApplicationMaterials(req, res) {
//     try {
//         const { application_id } = req.params;  // Get application ID from params
//         const materials = await ApplicationMaterial.getByApplicationId(application_id);  // Fetch from database
//         res.status(200).json(materials);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// module.exports = {
//     createApplicationMaterial,
//     updateApplicationMaterial,
//     getApplicationMaterials
// };

const ApplicationMaterial = require('../models/applicationMaterial');
const EssayCard = require('../models/essayCard');
const Essay = require('../models/essay');
const Template = require('../models/template');

// Create a new application material
async function createApplicationMaterial(req, res) {
    try {
        const materialData = new ApplicationMaterial(req.body);
        const newMaterial = await materialData.save(); // Save application material to DB
        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get application material by ID
async function getApplicationMaterialById(req, res) {
    try {
        const { id } = req.params;
        const material = await ApplicationMaterial.getById(id);
        if (!material) {
            return res.status(404).json({ error: 'Application material not found' });
        }
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update application material by ID
async function updateApplicationMaterial(req, res) {
    try {
        // const { id } = req.body;
        const { id, updateData } = req.body;
        // const updateData = req.body;  // Contains only the fields to be updated
        const updatedMaterial = await ApplicationMaterial.update(id, updateData);
        res.status(200).json(updatedMaterial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete application material by ID
async function deleteApplicationMaterial(req, res) {
    try {
        const { id } = req.params;
        const deleted = await ApplicationMaterial.delete(id);
        // if (!deleted) {
        //     return res.status(404).json({ error: 'Application material not found' });
        // }
        res.status(200).json({ message: 'Application material deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new essay card under application material
async function createEssayCard(req, res) {
    try {
        const { application_material_id } = req.body;
        const essayCardData = new EssayCard({ ...req.body, application_material_id });
        const newEssayCard = await essayCardData.save();
        res.status(201).json(newEssayCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get essay card by ID
async function getEssayCardById(req, res) {
    try {
        const { id } = req.params;
        const essayCard = await EssayCard.getById(id);
        if (!essayCard) {
            return res.status(404).json({ error: 'Essay card not found' });
        }
        res.status(200).json(essayCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get essay card by ID
async function getEssayCardByApplicationMaterialId(req, res) {
    try {
        const { id } = req.params;
        const essayCard = await EssayCard.getByApplicationMaterialId(id);
        if (!essayCard) {
            return res.status(404).json({ error: 'Essay card not found' });
        }
        res.status(200).json(essayCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// Update essay card
async function updateEssayCard(req, res) {
    try {
        // const { id } = req.body;
        // const updateData = req.body;
        const { id, updateData } = req.body;
        const updatedEssayCard = await EssayCard.update(id, updateData);
        res.status(200).json(updatedEssayCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Delete template by ID
async function deleteEssayCard(req, res) {
    try {
        const { id } = req.params;
        const deleted = await EssayCard.delete(id);
        // if (!deleted) {
        //     return res.status(404).json({ error: 'essay card not found' });
        // }
        res.status(200).json({ message: 'Essay card deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new essay under an essay card
async function createEssay(req, res) {
    try {
        const { essay_card_id } = req.body;
        const essayData = new Essay({ ...req.body, essay_card_id });
        const newEssay = await essayData.save();
        res.status(201).json(newEssay);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get essay by ID
async function getEssayById(req, res) {
    try {
        const { id } = req.params;
        const essay = await Essay.getById(id);
        if (!essay) {
            return res.status(404).json({ error: 'Essay not found' });
        }
        res.status(200).json(essay);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get essays by essay_card_id 
async function getEssayByEssayCardId(req, res) {
    try {
        const { id } = req.params;
        const essays = await Essay.getByEssayCardId(id);
        if (!essay) {
            return res.status(404).json({ error: 'Essays not found' });
        }
        res.status(200).json(essays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update essay
async function updateEssay(req, res) {
    try {
        const { id } = req.body;
        const updateData = req.body;
        const updatedEssay = await Essay.update(id, updateData);
        res.status(200).json(updatedEssay);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new template
async function createTemplate(req, res) {
    try {
        const templateData = new Template(req.body);
        const newTemplate = await templateData.save();
        res.status(201).json(newTemplate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get template by ID
async function getTemplateById(req, res) {
    try {
        const { template_id } = req.params;
        const template = await Template.getById(template_id);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.status(200).json(template);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update template
async function updateTemplate(req, res) {
    try {
        const { template_id } = req.body;
        const updateData = req.body;
        const updatedTemplate = await Template.update(template_id, updateData);
        res.status(200).json(updatedTemplate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete template by ID
async function deleteTemplate(req, res) {
    try {
        const { template_id } = req.params;
        const deleted = await Template.delete(template_id);
        if (!deleted) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.status(200).json({ message: 'Template deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createApplicationMaterial,
    getApplicationMaterialById,
    updateApplicationMaterial,
    deleteApplicationMaterial,
    createEssayCard,
    getEssayCardById,
    // getEssayCardByMenteeId
    getEssayCardByApplicationMaterialId,
    updateEssayCard,
    deleteEssayCard,
    createEssay,
    getEssayById,
    getEssayByEssayCardId,
    updateEssay,
    createTemplate,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
};

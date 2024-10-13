const express = require('express');
const appMaterialController = require('../src/controllers/applicationMaterialController');
const router = express.Router();

const {
    createApplicationMaterial,
    getApplicationMaterialById,
    updateApplicationMaterial,
    deleteApplicationMaterial,
    createEssayCard,
    getEssayCardById,
    getEssayCardByApplicationMaterialId,
    updateEssayCard,
    deleteEssayCard,
    createEssay,
    getEssayById,
    updateEssay,
    createTemplate,
    getTemplateById,
    updateTemplate,
    deleteTemplate
} = require('../src/controllers/applicationMaterialController');

// Application Material Routes
router.post('/createApplicationMaterial', createApplicationMaterial); // Create application material  - tested
router.get('/getApplicationMaterial/:id', getApplicationMaterialById); // Get application material by ID - tested
router.put('/updateApplicationMaterial', updateApplicationMaterial); // Update application material - tested
router.delete('/deleteApplicationMaterial/:id', deleteApplicationMaterial); // Delete application material by ID 

// Essay Card Routes
router.post('/createEssayCard', createEssayCard); // Create essay card - tested
router.get('/getEssayCard/:id', getEssayCardById); // Get essay card by ID - tested 
router.get('/getEssayCardByApplicationMaterialId/:id', getEssayCardByApplicationMaterialId) // - tested
router.put('/updateEssayCard', updateEssayCard); // Update essay card - tested 
router.delete('/deleteEssayCard/:id',deleteEssayCard); //delete essay card

// Essay Routes
router.post('/createEssay', createEssay); // Create essay
router.get('/getEssay/:id', getEssayById); // Get essay by ID
router.put('/updateEssay', updateEssay); // Update essay
router.get('/getByCardId',appMaterialController.getEssayByEssayCardId)

// Template Routes
router.post('/template', createTemplate); // Create template
router.get('/template/:template_id', getTemplateById); // Get template by ID
router.put('/template', updateTemplate); // Update template
router.delete('/template/:template_id', deleteTemplate); // Delete template by ID

module.exports = router;

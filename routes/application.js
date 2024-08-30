const express = require('express');
const applicationController = require('../src/controllers/applicationController');
const router = express.Router();

router.post('/createApplication', applicationController.createApplication);
router.put('/application/:id', applicationController.updateApplication);
router.get('/getApplication/:id', applicationController.getApplicationById);
router.get('/getApplications', applicationController.getAllApplications);
router.delete('/deleteApplication/:id', applicationController.deleteApplication);
router.get('/getApplicationByMentee',applicationController.getApplicationsByMentee)

module.exports = router;

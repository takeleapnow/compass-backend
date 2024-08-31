const express = require('express');
const applicationController = require('../src/controllers/applicationController');
const router = express.Router();

router.post('/createApplication', applicationController.createApplication);
router.put('/updateApplication', applicationController.updateApplication);
router.get('/getApplication', applicationController.getApplicationById);
router.get('/getAllApplications', applicationController.getAllApplications);
router.delete('/deleteApplication', applicationController.deleteApplication);
router.get('/getApplicationByMentee',applicationController.getApplicationsByMentee)

module.exports = router;

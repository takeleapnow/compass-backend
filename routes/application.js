const express = require('express');
const applicationController = require('../src/controllers/applicationController');
const router = express.Router();

router.post('/createApplication', applicationController.createApplication); //tested
router.put('/updateApplication', applicationController.updateApplication); //tested
router.get('/getApplication/:id', applicationController.getApplicationById); //tested
router.get('/getAllApplications', applicationController.getAllApplications); //not much useful might remove
router.delete('/deleteApplication/:id', applicationController.deleteApplication); //tested
router.get('/getApplicationByMentee/:mentee_id',applicationController.getApplicationsByMentee) 

module.exports = router;

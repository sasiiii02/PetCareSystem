const express = require('express');
const router = express.Router();
const adoptionFormControllers = require('../controllers/adoptionFormControllers');
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware

router.post('/apply', adoptionFormControllers.createApplication);
router.get('/my-applications', authMiddleware, adoptionFormControllers.getUserApplications); // Add middleware
router.put('/update/:id', adoptionFormControllers.updateApplication);
router.delete('/delete/:id', adoptionFormControllers.deleteApplication);
router.get('/all', adoptionFormControllers.getAllApplications);

module.exports = router;

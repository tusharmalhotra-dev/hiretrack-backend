const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/authMiddleware');
const { applyToJob, getAllApplicantsForJob } = require('../controllers/applicationController');

// @route   POST /api/applications/jobs/:id/apply
// @desc    Apply to a specific job
// @access  Private (user only)
router.post('/jobs/:id/apply', verifyToken, applyToJob);

// @route   GET /api/applications/jobs/:id/applicants
// @desc    View applicants for a specific job
// @access  Private (recruiter only)
router.get('/jobs/:id/applicants', verifyToken, getAllApplicantsForJob);

module.exports = router;
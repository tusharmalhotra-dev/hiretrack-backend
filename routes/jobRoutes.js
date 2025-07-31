const express = require('express');
const router = express.Router();

const {
    createJob,
    getAllJob,
    getMyJob
} = require('../controllers/jobController');

const verifyToken = require('../middlewares/authMiddleware');

// ✅ Recruiter creates a job
router.post('/', verifyToken, createJob);

// ✅ Public route - anyone can view jobs
router.get('/', getAllJob);

// ✅ Recruiter gets their own posted jobs
router.get('/recruiter/jobs', verifyToken, getMyJob);

module.exports = router;
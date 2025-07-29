const express = require('express');
const router = express.Router();
const { createJob } = require('../controllers/jobController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, createJob);

module.exports = router;

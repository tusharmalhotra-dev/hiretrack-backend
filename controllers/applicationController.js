const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/application');

// ✅ POST /api/applications/jobs/:id/apply
exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        if (req.user.role === 'recruiter') {
            return res.status(403).json({ error: "Recruiters cannot apply for jobs" });
        }

        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const alreadyApplied = await Application.findOne({
            where: {
                userId: req.user.id,
                jobId: jobId,
            },
        });

        if (alreadyApplied) {
            return res.status(400).json({ error: 'You have already applied for this job' });
        }

        const application = await Application.create({
            userId: req.user.id,
            jobId,
        });

        return res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        console.error("Application error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ GET /api/applications/jobs/:id/applicants
exports.getAllApplicantsForJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        // ✅ Check if job exists and belongs to current recruiter
        const job = await Job.findOne({
            where: {
                id: jobId,
                postedBy: req.user.id,
            },
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found or unauthorized' });
        }

        // ✅ Raw SQL query to fetch applicants
        const applications = await Application.sequelize.query(
            `SELECT applications.*, 
              users.id AS userId, 
              users.name AS userName, 
              users.email AS userEmail
       FROM applications
       INNER JOIN users ON applications.userId = users.id
       WHERE applications.jobId = :jobId
       ORDER BY applications.createdAt DESC`,
            {
                replacements: { jobId },
                type: Application.sequelize.QueryTypes.SELECT,
            }
        );

        return res.status(200).json({
            message: "Applicants fetched successfully",
            jobId,
            applications,
        });
    } catch (error) {
        console.error("Error fetching applicants:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}; 
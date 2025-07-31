const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/application");

// ✅ POST /api/jobs → Create a Job (Recruiter Only)
exports.createJob = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (req.user.role !== "recruiter") {
      return res.status(403).json({ error: "Only recruiters can post jobs" });
    }

    const job = await Job.create({
      title,
      description,
      location,
      postedBy: req.user.id,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.error("Job post error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ GET /api/jobs → Public Job Board
exports.getAllJob = async (req, res) => {
  try {
    // ✅ Query params
    const { page = 1, limit = 10, location, title, sortBy = "createdAt", order = "DESC" } = req.query;
    const offset = (page - 1) * limit;

    // ✅ Base SQL and filters
    let whereClause = "WHERE 1=1";
    const replacements = {};

    if (location) {
      whereClause += " AND LOWER(jobs.location) LIKE :location";
      replacements.location = `%${location.toLowerCase()}%`;
    }

    if (title) {
      whereClause += " AND LOWER(jobs.title) LIKE :title";
      replacements.title = `%${title.toLowerCase()}%`;
    }

    // ✅ SQL query with pagination, sorting, and filtering
    const jobs = await Job.sequelize.query(
      `
      SELECT jobs.*, 
             users.id AS userId, 
             users.name AS userName, 
             users.email AS userEmail
      FROM jobs
      INNER JOIN users ON jobs.postedBy = users.id
      ${whereClause}
      ORDER BY jobs.${sortBy} ${order}
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: {
          ...replacements,
          limit: parseInt(limit),
          offset: parseInt(offset),
        },
        type: Job.sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      message: "Jobs fetched successfully",
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
      filters: { location, title },
      sort: { by: sortBy, order: order.toUpperCase() },
      jobs,
    });
  } catch (error) {
    console.error("Job fetch error with filters:", error);
    res.status(500).json({ error: "Internal server error while fetching jobs" });
  }
};

// ✅ GET /api/jobs/recruiter/jobs → Recruiter's Own Jobs
exports.getMyJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ error: "Only recruiters can view their jobs" });
    }

    const jobs = await Job.sequelize.query(
      `SELECT jobs.*, 
              applications.id AS applicationId, 
              applications.userId AS applicationUserId, 
              applications.createdAt AS applicationCreatedAt 
       FROM jobs 
       LEFT JOIN applications ON jobs.id = applications.jobId 
       WHERE jobs.postedBy = :recruiterId 
       ORDER BY jobs.createdAt DESC`,
      {
        replacements: { recruiterId: req.user.id }, // ✅ prevents SQL injection
        type: Job.sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "Recruiter's jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Get my jobs error:", error);
    return res.status(500).json({
      error: "Internal server error while fetching recruiter jobs",
    });
  }
};

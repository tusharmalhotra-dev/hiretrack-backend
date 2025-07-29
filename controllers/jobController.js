const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    // Role check   
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ error: 'Only recruiters can post jobs' });
    }

    const job = await Job.create({
      title,
      description,
      location,
      postedBy: req.user.id,
    });

    res.status(201).json({
      message: 'Job posted successfully',
      job,
    });
  } catch (err) {
    console.error('Job post error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllJob = async(req,res) =>{
    
}

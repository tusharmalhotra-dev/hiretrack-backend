const express = require("express");
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.get("/", (req, res) => {
    res.send("✅ HireTrack API is live");
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = app;

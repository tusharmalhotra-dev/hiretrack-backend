const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors);
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get("/",(req,res)=>{
    res.send('HireTrack API is working');
})

module.exports = app;
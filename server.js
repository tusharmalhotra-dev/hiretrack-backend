const dotenv = require('dotenv');
const app = require('./app');
const sequelize = require('./config/db'); // ✅ DB import
const {User} = require('../models/user');
const {Job} = require('../modells/jobs');



dotenv.config();

// ✅ DB Connection Test
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('DB connection error:', err));

sequelize.sync({alter: true})
.then(()=> console.log('All models are synced'))
.catch((err)=> console.log('Sync error',err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

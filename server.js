import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

const app = require('./app');
const sequelize = require('./config/db');

// Optional: Auto-import all models once (keeps sync happy)
require('./models/User');
require('./models/job');
require('./models/application');

// ✅ Test DB connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection failed:', err));

// ✅ Sync all models
sequelize.sync({ alter: true })
  .then(() => console.log('✅ All models are synced with DB'))
  .catch((err) => console.error('❌ Sequelize sync error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
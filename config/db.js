// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// ✅ Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,      // hiretrack
  process.env.DB_USER,      // postgres
  process.env.DB_PASSWORD,  // your DB password
  {
    host: process.env.DB_HOST, // usually localhost
    dialect: 'postgres',
    logging: false,
  }
);

// ✅ Export the Sequelize instance
module.exports = sequelize;

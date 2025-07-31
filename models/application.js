const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Job = require('./jobs');

// ✅ Define the Application model
const Application = sequelize.define('Application', {}, {
tableName: 'applications',
timestamps: true,
});

// ✅ Relationships
User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });

Job.hasMany(Application, { foreignKey: 'jobId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = Application;
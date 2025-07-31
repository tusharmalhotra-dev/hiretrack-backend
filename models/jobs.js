const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

// ✅ Define the Job model
const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'jobs', 
  timestamps: true,
});

// ✅ Relationships
Job.belongsTo(User, { foreignKey: 'postedBy' });
User.hasMany(Job, { foreignKey: 'postedBy' });

module.exports = Job;
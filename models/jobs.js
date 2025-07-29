const { DataTypes, Sequelize } = require("sequelize");
const { User } = require("./User");
const sequelize = require("../config/db");

const Job = Sequelize.define(Job,
  {
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
  },
  {
    timestamps: true,
    tablename: "job",
  }
);

Job.belongsTo(User, { foreignKey: 'postedBy' });
User.hasMany(Job, { foreignKey: 'postedBy' });

module.exports = Job;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// ✅ Define the User model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Prevent duplicate emails
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'recruiter', 'user'),
        defaultValue: 'user', // Default role if not provided
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
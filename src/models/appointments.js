const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database.js'); // Import the sequelize instance directly

const Appointment = sequelize.define('Appointments', {
    bookerid: {
        type: DataTypes.INTEGER,
        allowNull: false, // Fixed typo: "allownull" -> "allowNull"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    enddate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employeeid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { Appointments: Appointment };
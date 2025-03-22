const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../db/database.js');
const Appointment = sequelize.define('Appointments', {
    bookerid: {
        type: DataTypes.INTEGER,
        allownull: false,
    },
    title: {
        type: DataTypes.STRING,
        allownull: false,
    },
    startdate: {
        type: DataTypes.DATE,
        allownull: false,
    },
    enddate: {
        type: DataTypes.DATE,
        allownull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allownull: false,
    },
    employeeid: {
        type: DataTypes.INTEGER,
        allownull: false,
    },
    notes: {
        type: DataTypes.STRING,
        allownull: false,
    },
});

module.exports = { Appointments }

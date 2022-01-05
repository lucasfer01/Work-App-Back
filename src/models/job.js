// Tipo de datos
const { DataTypes } = require('sequelize');
// Sequelize
const sequelize = require('../database/db');

// Job model
const jobModel =  sequelize.define('Job', {
    job_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    job_name: {
        type: DataTypes.STRING,
        unique: true
    },
    job_description: {
        type:DataTypes.STRING
    }
});

module.exports = jobModel;
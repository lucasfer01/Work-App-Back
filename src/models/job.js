// Tipo de datos
const { DataTypes } = require('sequelize');


// Job model
module.exports = (sequelize) => {
    sequelize.define('job', {
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
}
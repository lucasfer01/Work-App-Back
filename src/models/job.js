// Tipo de datos
const { DataTypes } = require('sequelize');


// Job model
module.exports = (sequelize) => {
    sequelize.define('job', {
        job_id : {
            type: DataTypes.INTEGER,
            primaryKey : true, 
            autoIncrement: true
        },
        job_name: {
            type: DataTypes.STRING,
            unique: true
        },
        job_description: {
            type:DataTypes.STRING
        },
        job_isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        job_photo:{
            type: DataTypes.STRING
        }
    });
}
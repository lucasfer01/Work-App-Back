// Tipo de datos
const { DataTypes } = require('sequelize');

// Definimos el modelo
module.exports = (sequelize) => {
    sequelize.define('user', {
        usr_id : {
            type: DataTypes.STRING,
            primaryKey : true,
            unique: true, 
            allowNull: false
        },
        usr_username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usr_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: true
        },
        usr_photo: {
            type: DataTypes.STRING
        },
        usr_role: {
            type: DataTypes.ENUM('user', 'admin')
        },
        usr_description: {
            type: DataTypes.STRING
        },
        usr_location: {
            type: DataTypes.JSON // Google map!!
        },
        usr_score: {
            type: DataTypes.INTEGER
        }
    });
}
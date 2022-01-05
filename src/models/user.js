const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

// Definimos el modelo
const userModel = sequelize.define('User', {
    usr_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    usr_username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usr_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usr_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
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
        type: DataTypes.STRING // INVESTIGAR!!!
    },
    usr_score: {
        type: DataTypes.INTEGER
    }
});

module.exports = userModel;
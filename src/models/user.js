// Tipo de datos
const { DataTypes } = require("sequelize");

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
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        usr_role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        },
        usr_description: {
            type: DataTypes.STRING
        },
        usr_location: {
            type: DataTypes.JSON // Google map!!
        },
        usr_score: {
            type: DataTypes.INTEGER
        },
        usr_isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue:  true
        },
        usr_social:{
            type: DataTypes.JSON // instagram, facebook, github, linkedin
        },
        usr_phone: {
            type: DataTypes.STRING
        },
        usr_country: {
            type: DataTypes.STRING
        },
        usr_gender: {
            type: DataTypes.STRING
        },
        usr_charge:{
            type: DataTypes.STRING
        },
        usr_alerts: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    });
}

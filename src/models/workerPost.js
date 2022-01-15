// Tipo de datos
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('workerPost', {
        wp_id : {
            type: DataTypes.INTEGER,
            primaryKey : true, 
            autoIncrement: true
        },
        wp_title: {
            type: DataTypes.STRING
        },
        wp_description: {
            type: DataTypes.STRING
        },
        wp_photo: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        wp_isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}
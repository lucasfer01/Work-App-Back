// Tipo de datos
const { DataTypes } = require('sequelize');

// Post model
module.exports = (sequelize) => {
    sequelize.define('post', {
        post_id : {
            type: DataTypes.INTEGER,
            primaryKey : true, 
            autoIncrement: true
        },
        post_title: {
            type: DataTypes.STRING
        },
        post_shortdescription: {
            type: DataTypes.STRING
        },
        post_description: {
            type: DataTypes.STRING
        },
        post_photo: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }, 
        post_priority: {
            type: DataTypes.STRING
        },
        post_fee: {
            type: DataTypes.INTEGER
        },
        post_isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}
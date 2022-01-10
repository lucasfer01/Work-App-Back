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
        post_status: {
            type: DataTypes.ENUM('status 1', 'status 2')
        },
        post_shortDescription: {
            type: DataTypes.STRING
        },
        post_description: {
            type: DataTypes.STRING
        },
        post_photo: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        post_type: {
            type: DataTypes.ENUM('contratar', 'ofrecer')
        }, 
        post_priority: {
            type: DataTypes.STRING
        },
        post_fee: {
            type: DataTypes.INTEGER
        }
    })
}
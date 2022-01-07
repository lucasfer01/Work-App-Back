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
        post_description: {
            type: DataTypes.STRING
        },
        post_photo: {
            type: DataTypes.STRING
        },
        post_type: {
            type: DataTypes.ENUM('contratar', 'ofrecer')
        }
    })
}
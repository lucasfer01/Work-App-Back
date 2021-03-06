// Tipo de datos
const { DataTypes } = require('sequelize');


// Chat model
module.exports = (sequelize) => {
    sequelize.define('chat', {
        chat_id : {
            type: DataTypes.INTEGER,
            primaryKey : true, 
            autoIncrement: true
        },
        chat_userIds: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
    });
}
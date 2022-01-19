// Tipo de datos
const { DataTypes } = require('sequelize');


// Message model
module.exports = (sequelize) => {
    sequelize.define('message', {
        message_id : {
            type: DataTypes.INTEGER,
            primaryKey : true, 
            autoIncrement: true
        },
        sender: {
            type: DataTypes.STRING,
        },
        receiver: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
        },
    });
}
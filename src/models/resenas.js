// Tipos de datos
const { DataTypes } = require('sequelize');

// Definimos el modelo
module.exports = (sequelize) => {
    sequelize.define('resenas', {
        resenas_id: {
            type: DataTypes.INTEGER,
            primaryKey : true, 
            autoIncrement: true
        },
        resena_score: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        }
    })
}
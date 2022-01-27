const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('pagos', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        status: {
            type: DataTypes.ENUM('created', 'pending', 'rejected', 'approved'),
            allowNull: false,
            defaultValue: 'created'
        },
        payment_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        payment_status: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    })
}
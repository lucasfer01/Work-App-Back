// Sequelize
const { Sequelize } = require('sequelize');
// Enviroment
const config = require('../config');

// PostgreSQL
const sequelize = new Sequelize(`postgres://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_HOST}:5432/${config.POSTGRES_DB_NAME}`, {logging: false});

module.exports = sequelize;
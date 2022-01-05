const dotenv = require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_DB_NAME: process.env.POSTGRES_DB_NAME
}
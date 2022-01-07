// Sequelize
const { Sequelize } = require("sequelize");
// Enviroment
const config = require('../config');
// Models
const modelsDefiners = {
    user: require('../models/user'),
    job: require('../models/job'),
    post: require('../models/post')
}

// PostgreSQL
const sequelize = new Sequelize(
  `postgres://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_HOST}:5432/${config.POSTGRES_DB_NAME}`,
  { logging: false }
);

// Injectamos conexion sequelize
Object.values(modelsDefiners).forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {User, Job, Post} = sequelize.models;

// Relaciones
User.belongsToMany(Job, {through: 'User_Job'}); // user-job
Job.belongsToMany(User, {through: 'User_Job'}); // user-job

User.hasMany(Post); // user-post
Post.belongsTo(User); // user-post

module.exports = {
    ...sequelize.models,
    sequelize
}

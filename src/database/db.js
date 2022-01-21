// Sequelize
const { Sequelize } = require("sequelize");
// Enviroment
const config = require('../config');
// Models
const modelsDefiners = {
    user: require('../models/user'),
    job: require('../models/job'),
    post: require('../models/post'),
    workerPost: require('../models/workerPost'),
    pagos: require('../models/pagos'),
    resenas: require('../models/resenas')
}

// PostgreSQL
// const sequelize = new Sequelize(
//   `postgres://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_HOST}:5432/${config.POSTGRES_DB_NAME}`,
//   { logging: false }
// );
//heroku
const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
}
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Injectamos conexion sequelize
Object.values(modelsDefiners).forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {User, Job, Post, WorkerPost, Pagos, Resenas} = sequelize.models;

// Relaciones
User.belongsToMany(Job, {through: 'User_Job'}); // user-job
Job.belongsToMany(User, {through: 'User_Job'}); // user-job

User.hasMany(Post, {foreignKey: 'usr_id'}); // user-post
Post.belongsTo(User); // user-post

WorkerPost.belongsToMany(Job, {through: 'WorkerPost_Job'}); // WorkerPost-Job
Job.belongsToMany(WorkerPost, {through: 'WorkerPost_Job'}); // WorkerPost-Job

User.hasMany(WorkerPost, {foreignKey: 'usr_id'}); // User-workerpost
WorkerPost.belongsTo(User); // User-Workerpost

Post.belongsToMany(Job, {through: 'Post_Job'}); // Post-Job
Job.belongsToMany(Post, {through: 'Post_Job'}); // Post-Job

User.hasMany(Pagos, {foreignKey: 'usr_id'}); // User-Pagos
Pagos.belongsTo(User); // User-Pagos

User.hasMany(Resenas, {foreignKey: 'usr_id'}); // User-resenas
Resenas.belongsTo(User); // User-Resenas

module.exports = {
    ...sequelize.models,
    sequelize
}

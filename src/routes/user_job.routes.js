// Router Express
const { Router } = require('express');
// Controller
const { userJob, getUserFromJob } = require('../controllers/user_job.controller');

// Creamos router
const userJobRoutes = Router();

// Rutas
userJobRoutes.post('/:userId/:jobId', userJob);

userJobRoutes.get('/job', getUserFromJob);

module.exports = {
    userJobRoutes
}
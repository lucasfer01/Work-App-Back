// Router Express
const { Router } = require('express');
// Controller
const { userJob } = require('../controllers/user_job.controller');

// Creamos router
const userJobRoutes = Router();

// Rutas
userJobRoutes.post('/:userId/:jobId', userJob);

module.exports = {
    userJobRoutes
}
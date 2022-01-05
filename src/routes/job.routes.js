// Router Express
const {Router} = require('express');
// Job controller
const {createJob, showJobs} = require('../controllers/job.controller');

// Creamos router
const jobRoutes = Router();

// Creamos rutas
jobRoutes.get('/', showJobs); // Mostramos todos los trabajos

jobRoutes.post('/', createJob); // Creamos un trabajo en la DB

// Exportamos router
module.exports = jobRoutes;
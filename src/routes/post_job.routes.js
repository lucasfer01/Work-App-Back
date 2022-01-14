// Router Express
const { Router } = require('express');
// Controllers
const { addJobToPost } = require('../controllers/post_job.controller');

// Creamos router
const postJobRoutes = Router();

// Rutas
postJobRoutes.post('/:postId/:jobId', addJobToPost); // Relacionar post con oficio

module.exports = {
    postJobRoutes
}
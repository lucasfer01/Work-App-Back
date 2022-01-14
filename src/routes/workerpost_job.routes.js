// Router Express
const { Router } = require('express');
// workerpost controllers
const { workerpostJob } = require('../controllers/workerpost_job.controller');

// router
const workerpostJobRouter = Router();

// Rutas
workerpostJobRouter.post('/:workerPostId/:jobId',workerpostJob); // Relacionamos workerpost con oficio

module.exports = {
    workerpostJobRouter
}
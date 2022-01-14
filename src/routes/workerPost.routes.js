// Router Express
const { Router } = require('express');
// workerPost controller
const { createWorkerPost,
        showUserWorkerPost,
        updateWorkerPost,
        deleteWorkerPost,
        showWorkerPostById } = require('../controllers/WorkerPost.controller');

// Creamos el router
const workerPostRoutes = Router();

// Creamos rutas
workerPostRoutes.get('/user/:userId', showUserWorkerPost); // Obtenemos workerposts de un usuario

workerPostRoutes.get('/:workerPostId', showWorkerPostById); // Obtenemos workerpost por id

workerPostRoutes.post('/', createWorkerPost); // Creamos un workerpost

workerPostRoutes.put('/:workerPostId', updateWorkerPost); // Actualizamos un workerpost

workerPostRoutes.delete('/:workerPostId', deleteWorkerPost); // Toggle isActive

module.exports = {
    workerPostRoutes
}
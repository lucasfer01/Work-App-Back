// Router Express
const { Router } = require('express');
// Controllers
const { createResena } = require('../controllers/resena.controller');

// Creamos router
const resenaRoutes = Router();

// Rutas
resenaRoutes.post('/', createResena); // Crear resena

module.exports = {
    resenaRoutes
}
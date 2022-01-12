// Router express
const { Router } = require('express');
// Auth User controller
const { authUser } = require('../controllers/autentificarUsuario.controller');

// Creamos router
const authUserRoutes = Router();

authUserRoutes.post('/', authUser); // Autentificar usuario

module.exports = {
    authUserRoutes
}
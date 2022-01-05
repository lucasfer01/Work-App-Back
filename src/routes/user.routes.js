// Router Express
const { Router } = require('express');
// User Controller
const { createUser, showUsers } = require('../controllers/user.controller');

// Usamos router
const userRoutes = Router();

// Creamos rutas
userRoutes.get('/', showUsers);

userRoutes.post('/', createUser);

// Exportamos rutas
module.exports = userRoutes;
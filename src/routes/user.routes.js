// Router Express
const { Router } = require('express');
// User Controller
const { createUser, showUsers, showUserById, modifyUser } = require('../controllers/user.controller');

// Usamos router
const userRoutes = Router();

// Creamos rutas
userRoutes.get('/', showUsers); // Obtenemos todos los usuarios

userRoutes.get('/:userId', showUserById); // Buscamos user por id y los mostramos

userRoutes.post('/', createUser); // Creamos un usuario

userRoutes.put('/:userId', modifyUser); // Actualizamos un usuario


// Exportamos rutas
module.exports = userRoutes;
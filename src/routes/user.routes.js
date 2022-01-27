// Router Express
const { Router } = require('express');
// User Controller
const { createUser, showUsers, showUserById, modifyUser, deleteUser } = require('../controllers/user.controller');
const { actualizarPlan } = require('../controllers/planes.controller');

// Usamos router
const userRoutes = Router();

// Creamos rutas
userRoutes.get('/', showUsers); // Obtenemos todos los usuarios

userRoutes.get('/:userId', showUserById); // Buscamos user por id y los mostramos

userRoutes.post('/', createUser); // Creamos un usuario

userRoutes.put('/:userId', modifyUser); // Actualizamos un usuario

userRoutes.delete('/:userId', deleteUser); // Eliminamos un usuario

userRoutes.put('/update-plan/:userId', actualizarPlan); // Cambiar el plan del usuario


// Exportamos rutas
module.exports = userRoutes;
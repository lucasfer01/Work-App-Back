// Router Express
const { Router } = require('express');
// User Controller
const { showChats } = require('../controllers/socketChat.controller');

// Usamos router
const socketChatRoutes = Router();

// Creamos rutas
socketChatRoutes.get('/', showChats); // Obtenemos todos los usuarios

// Exportamos rutas
module.exports = socketChatRoutes;
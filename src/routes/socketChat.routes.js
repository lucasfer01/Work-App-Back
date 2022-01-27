// Router Express
const { Router } = require('express');
// User Controller
const { getAllChats } = require('../controllers/socketChat.controller');

// Usamos router
const socketChatRoutes = Router();

// Creamos rutas
socketChatRoutes.get('/', getAllChats); // Obtenemos todos los chats


// Exportamos rutas
module.exports = socketChatRoutes;
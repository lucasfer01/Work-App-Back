// Router Express
const { Router } = require('express');
// Job controller
const { newMessage } = require('../controllers/notification.controller');

// Creamos router
const newMessageRoutes = Router();

// Creamos rutas
newMessageRoutes.post('/', newMessage); // Subscribirse a las notificaciones


// Exportamos router
module.exports = newMessageRoutes;
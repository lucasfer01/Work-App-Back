// Router Express
const { Router } = require('express');
// Job controller
const { subscribe } = require('../controllers/notification.controller');

// Creamos router
const subscriptionRoutes = Router();

// Creamos rutas
subscriptionRoutes.post('/', subscribe); // Subscribirse a las notificaciones


// Exportamos router
module.exports = subscriptionRoutes;
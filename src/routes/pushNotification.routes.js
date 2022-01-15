// Router Express
const { Router } = require('express');
// Job controller
const { pushNotification } = require('../controllers/notification.controller');

// Creamos router
const pushNotificationRouter = Router();

// Creamos rutas
pushNotificationRouter.post('/', pushNotification); // Subscribirse a las notificaciones


// Exportamos router
module.exports = pushNotificationRouter;
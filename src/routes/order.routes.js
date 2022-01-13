// Router Express
const { Router } = require('express');
// Order controller
const { createOder, createOrder } = require('../controllers/order.controller');

// Router
const orderRoutes = Router();

// Rutas
orderRoutes.post('/', createOrder); // Crear orden

module.exports = {
    orderRoutes
}
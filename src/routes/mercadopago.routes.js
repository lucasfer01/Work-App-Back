// Router Express
const { Router } = require('express');
// mercadopago
const { checkout } = require('../paymentGateway/index');

const mercadopagoRoutes = Router();

mercadopagoRoutes.post('/', checkout); // checkout preferencias

module.exports = {
    mercadopagoRoutes
}
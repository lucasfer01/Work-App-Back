// Router Express
const { Router } = require('express');
// mercadopago
const { checkout, buscarPreferencia } = require('../paymentGateway/index');

const mercadopagoRoutes = Router();

mercadopagoRoutes.post('/', checkout); // checkout preferencias

mercadopagoRoutes.get('/pagos/:id', buscarPreferencia); // Buscar peferencia

module.exports = {
    mercadopagoRoutes
}
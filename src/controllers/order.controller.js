// Order model
const { Order } = require('../database/db');

// Crear orden
const createOrder = (req,res,next) => {
    // Order data
    const { orderData } = req.body;

    // Cremos la orden
    Order.create({
        ...orderData
    })
    .then(order => res.json(order)) // Retornamos la orden en json
    .catch(error => next(error));
}

module.exports = {
    createOrder
}
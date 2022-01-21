// Requerimos mercadopago
const mercadopago = require('mercadopago');
// Enviroment
const { MP_ACCESS_TOKEN, MP_FAILURE_URL, MP_SUCCESS_URL } = require('../config');
// Pagos Model
const { Pagos } = require('../database/db');


// Access token
mercadopago.configure({
    access_token: MP_ACCESS_TOKEN
})

// checkout
const checkout = async (req, res, next) => {
    // Data
    const { items, usr_id } = req.body;

    // Creamos el pago en la base de datos
    const pago = await Pagos.create({
        status: 'created',
        usr_id: usr_id
    })

    // preferencia
    const preference = {
        items: [{
            ...items
        }],
        back_urls: {
            success: `${MP_SUCCESS_URL}/${pago.id}`,
            failure: `${MP_FAILURE_URL}/${pago.id}`,
            pending: ''
        },
        external_reference: `${pago.id}`,
        auto_return: 'approved'
    }

    // Crear preferencia
    mercadopago.preferences.create(preference)
        .then(response => {
            // Crear preferencia y retornarla
            res.json(response.body);
        })
        .catch(error => next(error));
}

// Buscar preferencia
const buscarPreferencia = (req, res, next) => {
    // id de preferencia por params
    const { id } = req.params;

    // Buscamos la preferencia
    mercadopago.get(`/v1/payments/search`, { external_reference: `${id}` })
        .then(preferencia => {
            // El ultimo elemento del array de pagos
            const index = (preferencia.body.results.length) - 1;

            // Buscamos la orden
            Pagos.findByPk(id)
            .then(orden => orden.update({
                    status: preferencia.body.results[index].status,
                    payment_id: preferencia.body.results[index].collector_id
                }))
                .then(orderUpdated => {

                    // Devolvemos el resultado
                    res.json([orderUpdated, preferencia.body.results[index]]);
                })
        })
        .catch(error => next(error));
}

module.exports = {
    checkout,
    buscarPreferencia
}
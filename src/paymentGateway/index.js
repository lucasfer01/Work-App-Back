// Requerimos mercadopago
const mercadopago = require('mercadopago');
// Enviroment
const { MP_ACCESS_TOKEN, MP_FAILURE_URL, MP_SUCCESS_URL } = require('../config');


// Access token
mercadopago.configure({
    access_token: MP_ACCESS_TOKEN
})

// checkout
const checkout = (req, res, next) => {
    // preference data
    const dataPreference = req.body;

    // preferencia
    const preference = {
        items: [{
            ...dataPreference
        }],
        back_urls: {
            success: MP_SUCCESS_URL,
            failure: MP_FAILURE_URL,
            pending: ''
        }
    }

    // Crear preferencia
    mercadopago.preferences.create(preference)
        .then(response => {
            // Crear preferencia y retornarla
            res.json(response.body);
        })
        .catch(error => next(error));
}

module.exports = {
    checkout
}
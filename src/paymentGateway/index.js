// Requerimos mercadopago
const mercadopago = require('mercadopago');
// Enviroment
const { MP_ACCESS_TOKEN } = require('../config');


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
        }]
    }

    // Crear preferencia
    mercadopago.preferences.create(preference)
        .then(response => {
            
            res.redirect(response.body.init_point); // Redirigir a pagina de pago
        })
        .catch(error => next(error));
}

module.exports = {
    checkout
}
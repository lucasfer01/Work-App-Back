// Router Express
const { Router } = require('express');
// Traigo controlador
const { enviarMail } = require('../controllers/nodemailer.controllers.js');
const emailPost = Router();

// Creo Ruta
emailPost.post('/', enviarMail);

module.exports = {
    emailPost
};
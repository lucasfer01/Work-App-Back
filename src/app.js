// MongoDb
const mongoose = require('mongoose');
const { PORT, MONGO_URL } = process.env;
// Express
const express = require('express');
const app = express();
//env
const config = require('./config');

mongoose
    .connect(config.MONGO_URL)
    .then((res) => {
        console.log(`Conectado a ${config.MONGO_URL}`);
    })
    .catch((error) => {
        console.log(error);
    });

// Middleware
app.use(express.json());

// Rutas
app.get('/', (req,res) => {
    res.send('Hola funciona');
});

// Server
const server = app.listen(config.PORT, () => {
    console.log(`Escuchando en puerto: ${config.PORT}`);
});
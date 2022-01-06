// Express
const express = require('express');
const app = express();
// Enviroment
const config = require('./config');
// Rutas
const userRoutes = require('./routes/user.routes');
const jobRoutes = require('./routes/job.routes');
// Database
const { sequelize } = require('./database/db');

// Middleware
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('Hola funciona home');
});

// Rutas Usuarios
app.use('/user', userRoutes);

// Rutas Trabajos
app.use('/job', jobRoutes);

// Server
const server = app.listen(config.PORT, () => {
    console.log(`Escuchando http://localhost:${config.PORT}`);

    // Conexion a la base de datos
    sequelize.sync({ force: true })
        .then(() => {
            console.log(`Conectado correctamente a DB ${config.POSTGRES_DB_NAME}`);
        }).catch(error => {
            console.log(error);
        });
});
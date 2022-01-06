// Express
const express = require('express');
const app = express();
// Enviroment
const config = require('./config');
// Rutas
const userRoutes = require('./routes/user.routes');
const jobRoutes = require('./routes/job.routes');
const {userJobRoutes} = require('./routes/user_job.routes');
// Database
const { sequelize } = require('./database/db');
// Cors
const cors = require('cors');
// Morgan
const morgan = require('morgan');


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Rutas
app.get('/', (req, res) => {
    res.send('Hola funciona home');
});

app.use('/user', userRoutes); // Rutas Usuarios

app.use('/job', jobRoutes); // Rutas Trabajos

app.use('/user-job', userJobRoutes); // Ruta agregar oficio a usuario
 
// Server
app.listen(config.PORT, () => {
    console.log(`Escuchando http://localhost:${config.PORT}`);

    // Conexion a la base de datos
    sequelize.sync({ force: true })
        .then(() => {
            console.log(`Conectado correctamente a DB ${config.POSTGRES_DB_NAME}`);
        }).catch(error => {
            console.log(error);
        });
});
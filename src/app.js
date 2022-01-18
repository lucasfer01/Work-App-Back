// Express
const express = require('express');
const app = express();
// http server
const { createServer } = require('http');
const httpServer = createServer(app);

// path
const path = require('path');
// Enviroment
const config = require('./config');
// Web-push
const webpush = require("./webpush/webpush.js");

// Rutas
const userRoutes = require('./routes/user.routes');
const jobRoutes = require('./routes/job.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const {userJobRoutes} = require('./routes/user_job.routes');
const {postRouter} = require('./routes/post.routes');
const { authUserRoutes } = require('./routes/autenficarUsuario.routes');
const pushNotificationRoutes = require('./routes/pushNotification.routes');
// const { chatRouter } = require('./routes/chat.routes');
const { mercadopagoRoutes } = require('./routes/mercadopago.routes');
const { workerPostRoutes } = require('./routes/workerPost.routes');
const { workerpostJobRouter } = require('./routes/workerpost_job.routes');
const { postJobRoutes } = require('./routes/post_job.routes');
const { emailPost } = require('./routes/nodemailer.routes.js');

// Controllers
const { cargarOficios } = require('./controllers/app.controller');

// Static content
app.use(express.static(path.join(__dirname, '/public')));

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

// app.use('/', chatRouter); // Ruta Chat

app.use('/', emailPost);

app.use('/user', userRoutes); // Rutas Usuarios

app.use('/job', jobRoutes); // Rutas Trabajos

app.use('/user-job', userJobRoutes); // Ruta agregar oficio a usuario

app.use('/workerpost-job', workerpostJobRouter); // Relacionar workerpost con oficio

app.use('/post-job', postJobRoutes); // relacionar post con oficio

app.use('/post', postRouter); // Ruta agregar post

app.use('/subscription', subscriptionRoutes); // Suscribirse a notificaciones

app.use('/push-notification', pushNotificationRoutes); // Suscribirse a notificaciones

app.use('/checkout', mercadopagoRoutes); // Checkout mercadopago


app.use('/workerPost', workerPostRoutes); // workerpost

// Server
const server = app.listen(config.PORT, () => {
    console.log(`Escuchando http://localhost:${config.PORT}`);

    // Conexion a la base de datos
    sequelize.sync({ force: true })
        .then(() => {
            console.log(`Conectado correctamente a DB ${config.POSTGRES_DB_NAME}`);
            // Cargamos oficios
            cargarOficios();
        }).catch(error => {
            console.log(error);
        });
});

// Socket.io
const socketIO = require('socket.io');
const io = socketIO(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001", "https://workapp-back-end.herokuapp.com/", "https://work-app-front.vercel.app/"],
    }
});

// Almacenar sockets de usuarios conectados
let connectedUsers = {};

// websockets
io.on('connection', (socket) => {
    console.log('a user connected', socket.id); 
    //Guardamos el socket en el objeto de usuarios conectados
    socket.on("register", (data) => {
        console.log(data);
        connectedUsers[data] = socket.id;
        console.log(connectedUsers);
    });
    //Escuchando un nuevo mensaje enviado por el cliente
    socket.on("message", (data) => {
        console.log(data);
        //Enviando el mensaje al receptor
        socket.to(connectedUsers[data.receiver]).emit("message", data);
    });
    //Escuchando un usuario que se desconecta
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})





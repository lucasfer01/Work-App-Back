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
const { resenaRoutes } = require('./routes/resena.routes');
const {
    saveChat,
    showChats,
    showChatsByUser,
    deleteChat
} = require('./controllers/socketChat.controller.js');
const socketChatRoutes = require('./routes/socketChat.routes');


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

app.use('/email', emailPost); // Ruta para enviar email

app.use('/user', userRoutes); // Rutas Usuarios

app.use('/job', jobRoutes); // Rutas Trabajos

app.use('/user-job', userJobRoutes); // Ruta agregar oficio a usuario

app.use('/workerpost-job', workerpostJobRouter); // Relacionar workerpost con oficio

app.use('/post-job', postJobRoutes); // relacionar post con oficio

app.use('/post', postRouter); // Ruta agregar post

app.use('/subscription', subscriptionRoutes); // Suscribirse a notificaciones

app.use('/push-notification', pushNotificationRoutes); // Suscribirse a notificaciones

app.use('/checkout', mercadopagoRoutes); // Checkout mercadopago

app.use('/resena', resenaRoutes); // Resenas

app.use('/workerPost', workerPostRoutes); // workerpost

app.use('/chat', socketChatRoutes); // Ruta Chat

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
        origin: ["http://localhost:3000", "http://localhost:3001", "https://workapp-back-end2.herokuapp.com", "https://work-app-front.vercel.app/"],
    }
});

// Almacenar sockets de usuarios conectados
let onlineUsers = {};
// Almacenar mensajes antes de guardarlos en DB
let messages = {};

// Aladir socket de usuario
const addUser = (userName, socketId) => {
    onlineUsers[userName] = socketId;
};

// Eliminar socket de usuario
const removeUser = (socketId) => {
    Object.keys(onlineUsers).forEach(userName => {
        if (onlineUsers[userName] === socketId) {
            delete onlineUsers[userName];
        }
    });
};

// Agregar prop a mensajes con nombre del chat y agregar mensaje a la lista de mensajes
const saveChatTemp = (chat) => {
    const { sender, receiver, message } = chat;
    const chatId1 = sender + "-" + receiver;
    const chatId2 = receiver + "-" + sender;
    const existingChat = messages[chatId1] || messages[chatId2];
    if (!existingChat) {
        messages[chatId1] = [chat];
    }   else {
        existingChat.push(chat);
    }
    return {msg: "Mensaje guardado temporalmente"};
}

// Obtener nombre de usuario a travez del socketId
const getUserBySocket = (socketId) => {
    let userName = null;
    Object.keys(onlineUsers).forEach(user => {
        if (onlineUsers[user] === socketId) {
            userName = user;
        }
    });
    return userName;
}

// Obtener los chats del usuario que se desconecta
const getChatsTemp = (socketId) => {
    const userName = getUserBySocket(socketId);
    let chats = [];
    Object.keys(messages).forEach(chatId => {
        if (chatId.includes(userName)) {
            chats = [...chats, messages[chatId]];
        }
    });
    return chats;
}

// Eliminar los chats temporales del usuario que se desconecta
const deleteChatsTemp = (socketId) => {
    const userName = getUserBySocket(socketId);
    Object.keys(messages).forEach(chatId => {
        if (chatId.includes(userName)) {
            delete messages[chatId];
        }
    });
}






// websockets
io.on('connection', (socket) => {
    console.log('a user connected', socket.id); 
    //Guardamos el socket en el objeto de usuarios conectados
    socket.on("register", async (data) => {
        addUser(data, socket.id);
        const chatHistory = await showChatsByUser(data);
        io.to(socket.id).emit('chatHistory', chatHistory);
    });
    //Escuchando un nuevo mensaje enviado por el cliente
    socket.on("message", async (data) => {
        //Guardamos el mensaje en el objeto de mensajes temporales
        saveChatTemp(data);
        //Enviando el mensaje al receptor
        if(onlineUsers[data.receiver]){
            io.to(onlineUsers[data.receiver]).emit("response", data);
            //Enviando notificación al receptor
            io.to(onlineUsers[data.receiver]).emit("notification", {
                type: "message",
                body: data,
            });
        } 
    });
    //Escuchando un usuario que se desconecta
    socket.on('disconnect', () => {
        //Obtenemos los chats temporales del usuario que se desconecta
        const chatsTemp = getChatsTemp(socket.id);
        console.log("chatstemp", chatsTemp);
        //Guardamos los chats temporales en la base de datos
        chatsTemp.forEach(async chat => {
            await saveChat(chat);
        });
        //Eliminamos los chats temporales del usuario que se desconecta
        deleteChatsTemp(socket.id);
        //Eliminamos el usuario de onlineUsers
        removeUser(socket.id);
    });
})





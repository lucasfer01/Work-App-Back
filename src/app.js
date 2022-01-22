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
    getOrCreateChat,
    saveMessages,
    getAllChats,
    getChatsByUserId,
    deleteChat,
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
    sequelize.sync({ force: false })
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
let onlineUsers = {};
// Almacenar mensajes antes de guardarlos en DB
let messages = {};

// Aladir socket de usuario
const addUser = (userId, socketId) => {
    onlineUsers[userId] = socketId;
};

// Eliminar socket de usuario
const removeUser = (socketId) => {
    Object.keys(onlineUsers).forEach(userId => {
        if (onlineUsers[userId] === socketId) {
            delete onlineUsers[userId];
        }
    });
};

// Agregar prop a mensajes con nombre del chat y agregar mensaje a la lista de mensajes
const saveChatTemp = (chat) => {
    const { sender, receiver, message } = chat;
    const chatId1 = sender + "&" + receiver;
    const chatId2 = receiver + "&" + sender;
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
    let userId = null;
    Object.keys(onlineUsers).forEach(onlineUserId => {
        if (onlineUsers[onlineUserId] === socketId) {
            userId = onlineUserId;
        }
    });
    return userId;
}

// Obtener los chats del usuario que se desconecta
const getChatsTemp = (socketId) => {
    const userId = getUserBySocket(socketId);
    let chats = [];
    Object.keys(messages).forEach(messageKey => {
        if (messageKey.includes(userId)) {
            chats = [...chats, messages[messageKey]];
        }
    });
    return chats;
}

// Eliminar los chats temporales del usuario que se desconecta
const deleteChatsTemp = (socketId) => {
    const userId = getUserBySocket(socketId);
    Object.keys(messages).forEach(messageKey => {
        if (messageKey.includes(userId)) {
            delete messages[messageKey];
        }
    });
    return {msg: "Chats temporales eliminados"};
}






// websockets
io.on('connection', (socket) => {
    console.log('a user connected', socket.id); 
    //Guardamos el socket en el objeto de usuarios conectados
    socket.on("register", async (data) => {
        addUser(data, socket.id);
    });
    //Obtenemos los mensajes del chat si existen
    socket.on("chat-history", async (data) => {
        const chatHistory = await getOrCreateChat(data.userId1, data.userId2);
        io.to(socket.id).emit('chat-history', chatHistory?.messages);
    })
    //Escuchando un nuevo mensaje enviado por el cliente
    socket.on("message", async (data) => {
        //Guardamos el mensaje en el objeto de mensajes temporales
        saveChatTemp(data);
        console.log("onlineUsers", onlineUsers);
        console.log("messages", messages);
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
    socket.on("save-chat", (data) => {
        //Obtenemos los chats temporales del usuario que se desconecta
        const chatsTemp = getChatsTemp(socket.id);
        console.log("chatstemp", chatsTemp);
        //Guardamos los chats temporales en la base de datos
        chatsTemp.forEach(async chat => {
            await saveMessages(chat);
        });
        //Eliminamos los chats temporales del usuario que se desconecta
        deleteChatsTemp(socket.id);
    })
    //Escuchando un usuario que se desconecta
    socket.on('disconnect', () => {
        //Eliminamos el usuario de onlineUsers
        removeUser(socket.id);
    });
})





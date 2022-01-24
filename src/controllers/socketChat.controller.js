// Chat model
const { Chat, User, Message } = require('../database/db');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

// Buscamos chat por id
const getChatById = async (chatId) => {
    if (typeof chatId !== "number") return {msg: "No chat"}
    const chat = await Chat.findOne({
        where: {
            chat_id: chatId
        },
        include: [Message, User]
    })
    return chat ? chat : null;
}


// Buscar chat por id de usuario emisor y receptor
const getChatByUsers = async (userId1, userId2) => {
    if (!userId1 || !userId2) return {msg: "No users"}
    const chat = await Chat.findOne({
        where: {
            chat_userIds: {
                [Op.contains]: [userId1, userId2]
            },
        },
        include: [User, Message]
    })
    return chat ? chat : null;
}

// Obtener o crear chat mediante ids de usuario emisor y receptor
const getOrCreateChat = async (userId1, userId2) => {
    if (!userId1 || !userId2) return {msg: "No users"}
    let chat = await getChatByUsers(userId1, userId2);
    if (!chat) {
        chat = await Chat.create({
            chat_userIds: [userId1, userId2]
        });
        // Agregamos el chat a los usuarios
        const [senderUser, receiverUser] = await Promise.all([
            User.findOne({
                where: {
                    usr_id: userId1
                }
            }),
            User.findOne({
                where: {
                    usr_id: userId2
                }
            })
        ]);
        if (!senderUser || !receiverUser) return {msg: "No users"}
        await senderUser.addChat(chat.chat_id);
        if (senderUser.usr_id !== receiverUser.usr_id) {
            await receiverUser.addChat(chat.chat_id)
        };
        // Agregamos los users al chat
        await chat.addUsers([senderUser.usr_id, receiverUser.usr_id]);
    }
    return chat;
}

// Guardar mensaje en chat
const saveMessage = async (data) => {
    const { sender, receiver, message} = data;
    if (!sender || !receiver || !message) return {msg: "No message"};
    // Buscamos el chat y si no existe lo creamos
    let chat = await getOrCreateChat(sender, receiver);
    // agregamos el mensaje al chat
    const newMessage = await Message.create(data);
    console.log("newMessage", newMessage);
    await chat.addMessage(newMessage);
    return chat;
}

// Guardar mensajes en un chat
const saveMessages = async (messages) => {
    if (!messages[0]) return [];
    const { sender, receiver } = messages[0];
    if (!sender || !receiver) return {msg: "No users"};
    // Buscamos el chat y si no existe lo creamos
    let chat = await getOrCreateChat(sender, receiver);
    // agregamos los mensajes al chat
    const newMessages = await Message.bulkCreate(messages);
    await chat.addMessages(newMessages);
    return chat;
}

// Mostrar todos los chats
const getAllChats = async (req, res, next) => {
    const chats = await Chat.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Message,
                required: false,
            }
        ]
    }) 
    return res.status(200).json(chats);
}

// Mostrar chats de un usuario
const getChatsByUserId = async (userId) => {
    if (!userId) return {msg: "No user"}
    const chats = await Chat.findAll({
        where: {
            chat_userIds: {
                [Op.contains]: [userId]
            }
        },
        include: User
    })
    return chats;
}

// Eliminar chat
const deleteChat = async (user1, user2) => {
    if (!user1 || !user2) return {msg: "No users"}
    const chat = await Chat.findOne({
        where: {
            chat_userIds: {
                [Op.contains]: [user1, user2]
            }
        }
    })
    if (!chat) return {msg: "No chat"}
    await chat.destroy();
    return {msg: "Chat deleted"}
}

// Exportamos los controladores
module.exports = {
    getChatById,
    getChatByUsers,
    getOrCreateChat,
    saveMessage,
    saveMessages,
    getAllChats,
    getChatsByUserId,
    deleteChat
}
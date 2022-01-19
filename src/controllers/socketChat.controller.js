// Chat model
const { Chat, User } = require('../database/db');

// Crear Chat
const createChatAndAddMessage = async (dataChat) => {
    const { sender, receiver, message } = dataChat;
    // Buscamos los usuarios
    const senderUser = await User.findOne({
        where: {
            usr_username: sender
        }
    });
    const receiverUser = await User.findOne({
        where: {
            usr_username: receiver
        }
    });
    // Creamos el chat
    const chat = await Chat.findOrCreate({
        where: {
            users: [senderUser.usr_id, receiverUser.usr_id]
        },
    })
    console.log(chat);
    await senderUser.addChat(chat[0]);
    await receiverUser.addChat(chat[0]);
    await chat[0].addUsers([senderUser.usr_id, receiverUser.usr_id]);
    // Agregamos el mensaje al chat
    const addMessage = await chat[0].update({
        chat_messages: [...chat[0].chat_messages, message]
    })
    return addMessage;
}

// Mostrar los chats
const showChats = async (req, res,next) => {
    const chats = await Chat.findAll()  // Buscamos todos los chats
    return res.status(200).json(chats); 
}

// Mostrar chats de un usuario
const showChatsByUser = async (userId) => {
    const chats = await Chat.findAll({
        where: {
            users: [userId]
        }
    });
}

// Buscar chat especifico entre dos personas
const findChat = async (sender, receiver) => {
    const senderUser = await User.findOne({
        where: {
            usr_username: sender
        }
    });
    const receiverUser = await User.findOne({
        where: {
            usr_username: receiver
        }
    });
    const chat = await Chat.findOne({
        where: {
            users: [senderUser.usr_id, receiverUser.usr_id]
        }
    });
    return chat;
}

// Eliminar chat
const deleteChat = async (req, res, next) => {
    const { chatId } = req.params;
    const chat = await Chat.findOne({
        where: {
            chat_id: chatId
        }
    });
    await chat.destroy();
    return res.status(200).json({
        message: 'Chat eliminado'
    });
}

// Exportamos los controladores
module.exports = {
    createChatAndAddMessage,
    showChats,
    showChatsByUser,
    findChat,
    deleteChat
}
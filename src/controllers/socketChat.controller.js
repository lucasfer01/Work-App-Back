// Chat model
const { Chat, User, Message } = require('../database/db');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

// Encontrar o crear chat y guardar mensajes
const saveChat = async (messages) => {
    const { sender, receiver } = messages[0];
    if (!sender || !receiver) return {msg: "No messages"}
    // Buscamos los usuarios que participan del chat
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
    // Buscamos el chat y si no existe lo creamos
    let chats = await Chat.findAll({
        include: [{
            model: User,
        }]
    });
    let chat = chats.find(chat => {
        return (chat.users.find(user => user.usr_username === sender) && chat.users.find(user => user.usr_username === receiver))
    });
    if (!chat) {
        chat = await Chat.create();
        // Agregamos el chat a los usuarios
        await senderUser.addChats([chat.chat_id]);
        await receiverUser.addChats([chat.chat_id]);
        // Agregamos los users al chat
        await chat.addUsers([senderUser.usr_id, receiverUser.usr_id]);
    }
    // agregamos los mensajes al chat
    const newMessages = await Message.bulkCreate(messages);
    await chat.addMessages(newMessages);
    return chat;
}

// Mostrar los chats
const showChats = async (req, res, next) => {
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
const showChatsByUser = async (userName) => {
    const user = await User.findOne({
        where: {
            usr_username: userName
        },
        attributes: ["usr_id", "usr_username"],
        include: [{
            model: Chat,
            attributes: ["chat_id"],
        }]
    });
    if (!user) {
        return {
            message: "User not found"
        }
    }
    const chats = await Chat.findAll({
        where: {
            chat_id: {
                [Op.in]: user.chats.map(chat => chat.chat_id)
            }
        },
        include: [{
            model: User,
            attributes: ["usr_id", "usr_username"],
        },
        {
            model: Message,
            required: false,
        }]
    });
    console.log("userChats", chats);
    return chats;
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
    saveChat,
    showChats,
    showChatsByUser,
    deleteChat
}
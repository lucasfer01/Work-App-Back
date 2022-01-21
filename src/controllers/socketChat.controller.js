// Chat model
const { Chat, User, Message } = require('../database/db');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

// Obtener o crear un chat mediante ids de usuario emisor y receptor
const getOrCreateChat = async (userId1, userId2) => {
    console.log("userids", userId1, userId2);
    /* let chat = await Chat.findOne({
        where: {
            chat_userIds: { 
                [Op.contains]: [userId1, userId2]
            }
        },
        include: [
            {
                model: User,
                required: false,
            },
            {
                model: Message,
                required: false,
            }
        ]
    }) */
    let chats = await Chat.findAll({
        include: Message,
    });
    let chat = chats.find(c => c.chat_userIds.includes(userId1) && c.chat_userIds.includes(userId2));
    if (!chat) {
        chat = await Chat.create({
            chat_userIds: [userId1, userId2]
        })
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
        await senderUser.addChats([chat.chat_id]);
        if (senderUser.usr_id !== receiverUser.usr_id) {
            await receiverUser.addChats([chat.chat_id])
        };
        // Agregamos los users al chat
        await chat.addUsers([senderUser.usr_id, receiverUser.usr_id]);
    }
    chat = await Chat.findOne({
        where: {
            chat_id: chat.chat_id
        },
        include: [
            {
                model: User,
                required: false,
            },
            {
                model: Message,
                required: false,
            }
        ]
    })
    console.log("chatfound", chat)
    return chat.messages ? chat : [];
}

// Guardar mensajes en un chat
const saveMessages = async (messages) => {
    if (!messages[0]) return [];
    const { sender, receiver } = messages[0];
    if (!sender || !receiver || !messages[0]) return {msg: "No messages"}
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
    const chats = await Chat.findAll({
        where: {
            chat_userIds: {
                [Op.contains]: [userId]
            }
        },
    })
    console.log("userChats", chats);
    return chats;
}

// Eliminar chat
const deleteChat = async (user1, user2) => {
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
    getOrCreateChat,
    saveMessages,
    getAllChats,
    getChatsByUserId,
    deleteChat
}
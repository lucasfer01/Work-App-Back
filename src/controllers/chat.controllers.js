const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH = './session.js';

const country_code = "54";
const number = "1161626871";
const msg = "Hola mi rey!";

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH)
}

const client = new Client({
    session: sessionData
});

client.initialize();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true})
});

client.on('ready', () => {
    console.log("Cliente listo...")
    let chatId = country_code + number + "@c.us";
    client.sendMessage(chatId, msg)
        .then(res => {
            if (res.id.fromMe) {
                console.log("El mensaje fue enviado.");
            };
        });
});

client.on('authenticated', s => {
    sessionData = s;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(s), err => {
        if(err) {
            console.log("Tienes un error ", err)
        }
    });
});

client.on('auth_failure', msg => {
    console.error('Fallo en la autenticación ', msg)
});

client.on('message', msg => {
    if(msg.body === "Hola") {
        client.sendMessage(msg.from, "Hola, ¿Cómo lo puedo ayudar?")
    } else if(msg.body === "Ayuda") {
        client.sendMessage(msg.from)
    }
})

const chat = (req, res) => {
    res.send("Holaa") 
};

module.exports = {
    chat
}
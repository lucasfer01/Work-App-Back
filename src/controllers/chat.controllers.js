const { Telegraf } = require('telegraf');
//Telegraf es un constructor que necesita el token de autenticación de mi cuenta.
const bot = new Telegraf('5091525623:AAGB-DPu3-6nyTqvz3vnAyx3NuAq5gucYhc');

bot.start((ctx) => {
    //ctx.from -> quien envía el mensaje.
    ctx.reply('Bienvenido ' + ctx.from.first_name);
});

bot.help((ctx) => {
    ctx.reply('Ayuda');
});

bot.settings((ctx) => {
    ctx.reply('Configurar');
});
//command configura el bot, pongo en un arreglo de strings como se lo puede escribir xq es sensible a mayusculas
bot.command(['mycommand', 'Mycommand', 'MyCommand', 'MYCOMMAND'], (ctx) => {
    ctx.reply('Mi comando configurado');
});
//Escucha un texto en específico.
bot.hears('computer', ctx => {
    ctx.reply('Hey, vendo computadoras');
});
/* Para cuando el ususario simplemente escriba.
bot.on('text', ctx => {
    ctx.reply('Estás escribiendo...');
});*/
//Para reconocer los stickers.
bot.on('sticker', ctx => {
    ctx.reply('Has enviado un sticker');
});
//Este método es para saber si se mencionó a alguien.
bot.mention('BotFather', ctx => {
    ctx.reply('Has mencionado a alguien.');
});
//Reconoce el teléfono
bot.phone('+54 11-2233-4455', ctx => {
    ctx.reply('Este es un número de teléfono.');
});
//Reconoce los hashtags.
bot.hashtag('programando', ctx => {
    ctx.reply('este es un hashtag.');
});
//Inicia el bot
bot.launch();

const chat = (req, res) => {
    res.send("Holaa") 
};

module.exports = {
    chat
};
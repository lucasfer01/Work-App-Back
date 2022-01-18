//Servidor con express
/*const express = require("express");
const http = require("http");
const app = express();

  //Inicializamos socketio
  const socketio = require("socket.io");
  const io = socketio(servidor);

  //Funcionalidad de socket.io en el servidor
  io.on("connection", (socket) => {
    let nombre;

    socket.on("conectado", (nomb) => {
      nombre = nomb;
      //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
      socket.broadcast.emit("mensajes", {
        nombre: nombre,
        mensaje: `${nombre} ha entrado en la sala del chat`,
      });
    });

    socket.on("mensaje", (nombre, mensaje) => {
      //io.emit manda el mensaje a todos los clientes conectados al chat
      io.emit("mensajes", { nombre, mensaje });
    });

    socket.on("disconnect", () => {
      io.emit("mensajes", {
        servidor: "Servidor",
        mensaje: `${nombre} ha abandonado la sala`,
      });
    });
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
//  Para cuando el ususario simplemente escriba.
// bot.on('text', ctx => {
//     ctx.reply('Estás escribiendo...');
// });
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
//bot.launch();
*/


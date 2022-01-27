// Models
const { Resenas, User } = require('../database/db');

// Crear una resena
const createResena = async (req, res, next) => {
    // Data de resena
    const dataResena = req.body;

    // Creamos la resena
    const createdResena = await Resenas.create({
        ...dataResena
    })

    // Buscamos todas las resenas de un usuario con el id recibido con la data de la resena
    const findResenas = await Resenas.findAll({where: {usr_id: createdResena.usr_id}})

    // Guardamos en una variable la cantidad de resena que hay en base de datos para posteriormente sacar el promedio
    const cantidadResenas = findResenas.length;

    // Calculamos el puntaje
    const puntaje = findResenas.reduce((previousValue, currentValue) => previousValue + currentValue.resena_score, 0) / cantidadResenas;

    // Actualizamos el score del usuario
    User.findByPk(createdResena.usr_id).then(user => user.update({usr_score: parseFloat(puntaje.toFixed(2))})).then(response => res.json(response)).catch(error => res.json({msg:error}));
}

module.exports = {
    createResena
}
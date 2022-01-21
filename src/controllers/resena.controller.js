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

    const findResenas = await Resenas.findAll({where: {usr_id: createdResena.usr_id}})

    const cantidadResenas = findResenas.length;

    const puntaje = findResenas.reduce((previousValue, currentValue) => previousValue + currentValue.resena_score, 0) / cantidadResenas;

    User.findByPk(createdResena.usr_id).then(user => user.update({usr_score: puntaje.toFixed(2)})).then(response => res.json(response)).catch(error => res.json({msg:error}));
}

module.exports = {
    createResena
}
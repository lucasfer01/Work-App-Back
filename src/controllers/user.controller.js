// User model
const { User } = require('../database/db');
// Post model
const { Post, Job } = require('../database/db');


// Crear usuario
const createUser = (req, res, next) => {
    // Cuerpo de la solicitud
    const dataUser = req.body;

    // Buscamos el usuario
    User.findOne({ where: { usr_username: dataUser.usr_username } })
        .then(response => {
            // Si existe no lo creamos
            if (response) return res.status(304).send('El usuario ya existe');

            // Creamos el nuevo usuario
            User.create({
                ...dataUser
            }).then(response => {
                // Devolvemos el usuario creado
                return res.status(200).json(response);

            }).catch(error => {
                return next(error);
            });

        }).catch(error => {
            return next(error);
        });
}

// Mostrar usuarios
const showUsers = (req, res, next) => {
    // Buscar todos los usuarios
    User.findAll({
        include: [Job,Post]
    })
        .then(response => {
            // Retornamos los usuarios encontrados
            return res.status(200).json(response);

        }).catch(error => {
            return next(error);
        });
}

// Mostrar usuario por id
const showUserById = (req, res, next) => {
    // UserId req.params
    const { userId } = req.params;

    // Buscamos el usuario por id
    User.findByPk(userId, {
        include: [Job,Post]
    })
        .then(user => res.json(user))
        .catch(error => next(error));
}

// Modificar usuarios
const modifyUser = (req, res, next) => {
    // userId req.params
    const { userId } = req.params;
    // Data a modificar
    const dataUser = req.body;

    // Buscamos el usuario por el id
    User.findByPk(userId)
    .then(user => {
        return user.update({ // Actualizamos el usuario con la data recibida por body
            ...dataUser
        })
    })
    .then(userUpdate => res.json(userUpdate)) // Mostramos le usuario actualizado
    .catch(error => next(error));
}

// Eliminar usuarios
const deleteUser = (req,res,next) => {
    // userId req.params
    const { userId } = req.params;

    // Buscamos el usuario
    User.findByPk(userId)
        .then(user => user.destroy()) // Eliminamos el usuario
        .then(response => res.sendStatus(200))
        .catch(error => next(error));
}

module.exports = {
    createUser,
    showUsers,
    showUserById,
    modifyUser,
    deleteUser
}
// User model
const { User } = require('../database/db');
// Post model
const { Post } = require('../database/db');

// Crear usuario
const createUser = (req, res) => {
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
                return res.json(error);
            });

        }).catch(error => {
            return res.json(error);
        });
}

// Mostrar usuarios
const showUsers = (req, res) => {
    // Buscar todos los usuarios
    User.findAll({
        include: Post
    })
        .then(response => {
            // Retornamos los usuarios encontrados
            return res.status(200).json(response);

        }).catch(error => {
            return res.json(error);
        });
}

// Mostrar usuario por id
const showUserById = (req,res) => {
    // UserId req.params
    const { userId } = req.params;

    // Buscamos el usuario por id
    User.findByPk(userId)
        .then(user => res.json(user))
        .catch(error => res.json(error));
}

module.exports = {
    createUser,
    showUsers,
    showUserById
}
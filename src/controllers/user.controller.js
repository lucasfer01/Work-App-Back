// User model
const user = require('../models/user');

// Crear usuario
const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            photo,
            description,
            servicesOffered,
            workHistory,
            employeeHistory,
            reputation } = req.body;

        const findUser = await user.findOne({ username });

        if (findUser) return res.status(304).json('El username ya existe');

        // Creamos el nuevo usuario
        const createdUser = new user({
            username,
            email,
            photo,
            description,
            servicesOffered,
            workHistory,
            employeeHistory,
            reputation
        })

        // Guardamos el usuario
        const saveUser = await createdUser.save();

        // Devolvemos el usuario creado
        return res.status(200).json(saveUser);

    } catch (error) {
        res.json(error);
    }
}

// Mostrar usuario
const showUser = async (req,res) => {
    try {
        // Buscar todos los usuarios
        const users = await user.find();

        // Retornamos los usuarios encontrados
        return res.status(200).json(users);

    } catch(error) {
        res.json(error);
    }
}

module.exports = {
    createUser,
    showUser
}
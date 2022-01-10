// User Model
const { User } = require('../database/db');

// Autentificar usuario con mail  contrasena
const authUser = (req,res,next) => {
    // usr_email and usr_password por body
    const { usr_email, usr_password } = req.body;

    // Buscamos el usuario por email
    User.findOne({
        where: {
            usr_email
        }
    })
    .then(user => {
        // Si no encontro el usuario retornamos false
        if(!user) return res.send({auth: false}); 

        // Comparamos la contrasena del usuario encontrado 
        // con la contrasena enviada por body
        if(user.dataValues.usr_password === usr_password) {
            // Si la contrasena coincide retornamos true
            return res.send({auth: true})
        } else {
            // Si la contrasena no coincide retornamos false
            return res.send({auth: false}); 
        }
    })
    .catch(error => next(error));
}

module.exports = {
    authUser
}
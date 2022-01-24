// Models
const { User } = require('../database/db');

// Actualizar plan
const actualizarPlan = (req, res, next) => {
    // Recibimos el userId por params
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ msg: "No user id" });

    // Buscamos el usuario
    User.findByPk(userId)
        .then(user => {
            if (user.usr_plan === 'free') { // Si su plan es free...
                user.update({ usr_plan: 'premium' }) // Lo cambiamos a premium
                    .then(updatedUser => res.json(updatedUser)) // Devolvemos el resultado
                    .catch(error => res.status(400).json({ msg: error }));

            } else { // Si el plan es premium...
                user.update({ usr_plan: 'free' }) // Lo cambiamos a free
                    .then(updatedUser => res.json(updatedUser)) // Retornamos el resultado
                    .catch(error => res.status(400).json({ msg: error }))
            }
        })
}

module.exports = {
    actualizarPlan
}
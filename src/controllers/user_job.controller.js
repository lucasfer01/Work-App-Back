// User model
const { User } = require('../database/db');

// Agregar oficio a usuario
const userJob = (req, res, next) => {
    // Cuerpo de la solicitud
    const { userId, jobId } = req.params;

    User.findByPk(userId)
        .then(userFind => {
            return userFind.addJobs(jobId);
        })
        .then(response => res.sendStatus(200))
        .catch(error => next(error));

}

module.exports = {
    userJob
}
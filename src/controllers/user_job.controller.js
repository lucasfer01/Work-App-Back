// User model
const { User, Job } = require('../database/db');

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

// Buscar usuarios de un oficio
const getUserFromJob = (req, res, next) => {
    // Obtenemos el trabajo a filtrar por query
    const { jobName } = req.query;

    // Buscamos entre todos los usuarios
    User.findAll({
        include: [{ // Los que tienen como oficio lo recibido por query
            model: Job,
            where: {
                job_name: jobName
            }
        }]
    })
    .then(users => res.json(users))
    .catch(error=> next(error));
}

module.exports = {
    userJob,
    getUserFromJob
}
// workerPost model
const { WorkerPost, User, Job } = require('../database/db');

// Crear WorkerPost
const createWorkerPost = (req, res, next) => {
    // WorkerPostData por body
    const workerPostData = req.body;

    // Creamos el post
    WorkerPost.create({
        ...workerPostData
    })
        .then(createdWorkerPost => {
            // Retornamos el post de trabajador creado
            return res.status(200).json(createdWorkerPost);
        })
        .catch(error => next(error));
}

// Mostrar WorkerPost de un usuario
const showUserWorkerPost = (req, res, next) => {
    // Recibimos el id del usuario por params
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ msg: "No user id" });

    // Mostrar los post de un usuario
    WorkerPost.findAll({
        where: {
            usr_id: userId,
            wp_isActive: true
        },
        attributes: {
            exclude: ['userUsrId']
        },
        include: [{
            required: false,
            model: Job,
            attributes: {
                exclude: ['updatedAt','createdAt']
            },
            through: {
                attributes: []
            },
            where: {
                job_isActive: true
            }
        }]
    })
        .then(posts => {
            // Retornamos los posts en json
            return res.status(200).json(posts);
        })
        .catch(error => next(error))
}

// Mostar workerpost por id
const showWorkerPostById = (req, res, next) => {
    // WorkerPostId por params
    const { workerPostId } = req.params;
    if (!workerPostId) return res.status(400).json({ msg: "No worker post id" });

    // Buscamos el workerpost
    WorkerPost.findOne({
        where: {
            wp_id: workerPostId
        },
        attributes: {
            exclude: ['userUsrId']
        },
        include: [{
            required: false,
            model: Job,
            attributes: {
                exclude: ['updatedAt','createdAt']
            },
            through: {
                attributes: []
            },
            where: {
                job_isActive: true
            }
        }]
    })
        .then(post => res.json(post)) // Retornamos el resultado en json
        .catch(error => next(error))
}

// Mostrar todos los workerPost
const showAllWorkerpost = (req,res,next) => {
    // Buscamos todos los workerpost
    WorkerPost.findAll({
        where: {
            wp_isActive: true
        },
        include: [{
            required: false,
            model: Job,
            attributes: {
                exclude: ['updatedAt','createdAt']
            },
            through: {
                attributes: []
            },
            where: {
                job_isActive: true
            }
        }]
    })
}

// Actualizar WorkerPost
const updateWorkerPost = (req, res, next) => {
    // WorkerPostId por params
    const { workerPostId } = req.params;
    // Data de workerPost por body
    const dataWorkerPost = req.body;
    if (!workerPostId) return res.status(400).json({ msg: "No worker post id" });

    // Buscamos el post
    WorkerPost.findByPk(workerPostId)
        .then(workerPost => {
            // Actualizamos el post con la data recibida por body
            return workerPost.update({
                ...dataWorkerPost
            })
        })
        .then(updatedPost => res.json(updatedPost)) // Devolvemos en formato json
        .catch(error => next(error));
}

// Eliminar WorkerPost
const deleteWorkerPost = (req, res, next) => {
    // WorkerPostId por params
    const { workerPostId } = req.params;
    if (!workerPostId) return res.status(400).json({ msg: "No worker post id" });

    // Busacamos el workerPost
    WorkerPost.findByPk(workerPostId)
        .then(workerPost => {
            return workerPost.update({
                wp_isActive: !workerPost.wp_isActive
            })
        })
        .then(response => res.sendStatus(200))
        .catch(error => next(error));
}


module.exports = {
    createWorkerPost,
    showUserWorkerPost,
    updateWorkerPost,
    deleteWorkerPost,
    showWorkerPostById
}
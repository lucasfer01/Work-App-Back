// Job model
const { Job, User, Post, WorkerPost } = require('../database/db');

// Create job
const createJob = (req, res, next) => {
    // Cuerpo de la solicitud
    const dataJob = req.body;
    if (!dataJob) return res.status(400).json({msg: "No job data"});

    // Buscamos el oficio
    Job.findOne({
        where: {
            job_name: dataJob.job_name
        }
    }).then(response => {
        // Si existe retornamos status 304
        if (response) return res.status(304).send('El oficio ya existe');

        // Si no existe lo creamos
        Job.create({
            // Le pasamos la data del cuerpo de la solicitud
            ...dataJob
        }).then(response => {
            // Devolvemos el usuario creado
            return res.status(200).json(response);

        }).catch(error => {
            return next(error);
        });

    }).catch(error => {
        return next(error);
    })
}

// Mostrar los trabajos
const showJobs = (req, res,next) => {
    // Buscamos todos los usuarios
    Job.findAll({
        where: {
            job_isActive: true
        },
        include: [{
            required: false,
            model: User,
            through: {
                attributes: []
            },
            where: {
                usr_isActive: true
            }
        },{
            required: false,
            model: Post,
            through: {
                attributes: []
            },
            where: {
                post_isActive: true
            }
        }]
    })
        .then(response => {
            // Retornamos todos los usuarios encotrados
            return res.status(200).json(response);

        }).catch(error => {
            return next(error);
        })
}

// Mostrar trabajo por id
const showJobById = (req,res,next) => {
    // jobId por url
    const { jobId } = req.params;
    if (!jobId) return res.status(400).json({msg: "No job id"});

    // Buscamos el trabajo
    Job.findOne({
        where: {
            job_id: jobId
        },
        include: [{
            required: false,
            model: User,
            through: {
                attributes: []
            },
            where: {
                usr_isActive: true
            }
        },{
            required: false,
            model: Post,
            through: {
                attributes: []
            },
            where: {
                post_isActive: true
            }
        },{
            required: false,
            model: WorkerPost,
            through: {
                attributes: []
            },
            where: {
                wp_isActive: true
            }
        }]
    })
        .then(job => res.json(job)) // Mostramos el trabjao encontrado
        .catch(error => next(error));
}

// Mostrar trabajo por nombre
const showJobByName = (req,res,next) => {
    // jobName por query
    const { jobName } = req.query;
    if (!jobName) return res.status(400).json({msg: "No job name"});

    // Buscamos el oficio por nombre
    Job.findOne({
        where: {
            job_name: jobName
        },
        include: [{
            required: false,
            model: User,
            where: {
                usr_isActive: true
            }
        }]
    })
    .then(job => res.json(job))
    .catch(error => next(error));
}

// Actualizar trabajo
const modifyJob = (req,res,next) => {
    // jobId por url
    const { jobId } = req.params;
    // Data a actualizar
    const dataJob = req.body;
    if (!jobId || !dataJob) return res.status(400).json({msg: "No job id or data"});

    // Buscamos el trabajo
    Job.findByPk(jobId)
        .then(job => job.update({ // actualizamos el trabajo con la data del body
            ...dataJob
        }))
        .then(jobUpdated => res.json(jobUpdated)) // Devolvemos el trabajo actualizado
        .catch(error => next(error));
}

// Eliminar trabajo
const deleteJob = (req,res,next) => {
    // jobId por url
    const { jobId } = req.params;
    if (!jobId) return res.status(400).json({msg: "No job id"});

    // Buscamos el trabajo por id
    Job.findByPk(jobId)
        .then(job => job.update({job_isActive: !job.job_isActive})) // Cambiamos el valor de isActive
        .then(response => res.sendStatus(200)) // Si todo sale bien enviamos un status 200
        .catch(error => next(error));
}

// Exportamos los controladores
module.exports = {
    createJob,
    showJobs,
    showJobById,
    modifyJob,
    deleteJob,
    showJobByName
}
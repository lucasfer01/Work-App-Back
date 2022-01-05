// Job model
const jobModel = require('../models/job');

// Create job
const createJob = (req, res) => {
    // Cuerpo de la solicitud
    const dataJob = req.body;

    // Buscamos el oficio
    jobModel.findOne({
        where: {
            job_name: dataJob.job_name
        }
    }).then(response => {
        // Si existe retornamos status 304
        if (response) return res.status(304).send('El oficio ya existe');

        // Si no existe lo creamos
        jobModel.create({
            // Le pasamos la data del cuerpo de la solicitud
            ...dataJob
        }).then(response => {
            // Devolvemos el usuario creado
            return res.status(200).json(response);

        }).catch(error => {
            return res.json(error);
        });

    }).catch(error => {
        return res.json(error);
    })
}

// Mostrar los trabajos
const showJobs = (req,res) => {
    // Buscamos todos los usuarios
    jobModel.findAll()
        .then(response => {
            // Retornamos todos los usuarios encotrados
            return res.status(200).json(response);

        }).catch(error => {
            return res.json(error);
        })
}

// Exportamos los controladores
module.exports = {
    createJob,
    showJobs
}
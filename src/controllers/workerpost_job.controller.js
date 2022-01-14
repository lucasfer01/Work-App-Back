// WorkerPost model
const { WorkerPost, Job } = require('../database/db');

// Relacionar workerpost con usuario
const workerpostJob = (req, res, next) => {
    // Id de workerpost y job por params
    const { workerPostId, jobId } = req.params;

    // Buscamos el workerPostId
    WorkerPost.findByPk(workerPostId)
        .then(workerpost => {
            // relacionamos workerpost con oficio
            return workerpost.addJobs(jobId)
        })
        .then(response => res.sendStatus(200))
        .catch(error => next(error))
}

module.exports = {
    workerpostJob
}
// Models
const { Post, Job } = require('../database/db');

// Agregar oficio a un post
const addJobToPost = (req,res,next) => {
    // PostId y jobId por params
    const { postId, jobId } = req.params;

    // Buscamos el post
    Post.findByPk(postId)
    .then(post => post.addJobs(jobId)) // Cuando se encuentre hacemos la relacion
    .then(response => res.sendStatus(200)) // Respondemos con un 200
    .catch(error => next(error));
}

module.exports = {
    addJobToPost
}
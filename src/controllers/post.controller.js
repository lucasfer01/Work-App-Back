// Post model
const { Post, Job, User } = require('../database/db');

// Crea un post
const createPost = (req, res, next) => {
    // Body Request
    const dataPost = req.body;

    // Creamos el post
    Post.create({
        ...dataPost
    })
        .then(post => {
            return res.status(200).json(post);
        })
        .catch(error => next(error));
}

// Mostrar todos los post
const showPosts = (req, res, next) => {
    // Buscamos todos los posts
    Post.findAll({
        where: {
            post_isActive: true
        },
        attributes: {
            exclude: ['userUsrId'],
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
        .then(posts => res.json(posts)) // Retornamos todos los post encontrados
        .catch(error => next(error));
}

// Mostrar post por id
const showPostById = (req, res, next) => {
    // Id de req.params
    const { postId } = req.params;

    // Buscamos el post
    Post.findOne({
        where: {
            post_id: postId
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
        .then(post => res.json(post)) // Retornamos el post encontrado
        .catch(error => next(error));
}

// Actualizamos el post
const modifyPost = (req, res, next) => {
    // postId de url
    const { postId } = req.params;
    // Data del post a actualizar
    const dataPost = req.body;

    // Buscamos el post
    Post.findByPk(postId)
        .then(post => post.update({
            ...dataPost
        }))
        .then(postUpdated => res.json(postUpdated))
        .catch(error => next(error));
}

// Delete post
const deletePost = (req, res, next) => {
    // postId de url
    const { postId } = req.params;

    // Buscamos el post en la bbdd
    Post.findByPk(postId)
        .then(post => post.update({ post_isActive: !post.post_isActive }))
        .then(response => res.sendStatus(200))
        .catch(error => next(error));
}

// Exportamos las funciones
module.exports = {
    createPost,
    showPosts,
    showPostById,
    modifyPost,
    deletePost
}
// Post model
const { Post } = require('../database/db');

// Crea un post
const createPost = (req, res) => {
    // Body Request
    const dataPost = req.body;

    // Creamos el post
    Post.create({
        ...dataPost
    })
        .then(post => {
            return res.status(200).json(post);
        })
        .catch(error => res.json(error));
}

// Mostrar todos los post
const showPosts = (req, res) => {
    // Buscamos todos los posts
    Post.findAll()
        .then(posts => res.json(posts)) // Retornamos todos los post encontrados
        .catch(error => res.json(error));
}

// Mostrar post por id
const showPostById = (req, res) => {
    // Id de req.params
    const { postId } = req.params;

    // Buscamos el post
    Post.findByPk(postId)
        .then(post => res.json(post)) // Retornamos el post encontrado
        .catch(error => res.json(error));
}

// Exportamos las funciones
module.exports = {
    createPost,
    showPosts,
    showPostById
}
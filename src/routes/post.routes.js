// Router Express
const { Router } = require('express');
// Post controllers
const { createPost,
        showPosts, 
        showPostById, 
        modifyPost, 
        deletePost } = require('../controllers/post.controller');

// Creamos router
const postRouter = Router();

// Creamos rutas
postRouter.get('/', showPosts); // Mostramos todos los posts

postRouter.get('/:postId', showPostById); // Mostramos post por id

postRouter.post('/', createPost); // Creamos un post

postRouter.put('/:postId', modifyPost); // Modificamos el post

postRouter.delete('/:postId', deletePost); // Borramos el post

// Exportamos router
module.exports = {
    postRouter
}
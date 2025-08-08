const Post = require('../models/post');
const image = require('../utils/image');

async function createPost(req, res) {
    try {
        const post = new Post(req.body);
        post.created_at = new Date();
        const imagePath = image.getFilePath(req.files.miniature, 'image');
        post.miniature = imagePath;

        const postStored = await post.save();
        return res.status(201).send({ post: postStored });
    } catch (err) {
        console.error("Error creating post:", err);
        return res.status(400).send({ msg: "Error creating post" });
    }
}

async function getPost(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc" } // Ordenar por fecha de creación descendente
    };

    try {
        const posts = await Post.paginate({}, options);
        return res.status(200).send(posts);
    } catch (err) {
        return res.status(400).send({ msg: "Error retrieving posts", error: err.message });
    }
}

async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const postData = req.body;

        // Si hay una nueva imagen enviada, obtener su path
        if (req.files?.miniature) {
            const imagePath = image.getFilePath(req.files.miniature, 'image');
            postData.miniature = imagePath;
        }

        // Actualización usando await y opciones modernas
        const updatedPost = await Post.findByIdAndUpdate(id, postData, {
            new: true,       // Retorna el documento modificado
            runValidators: true // Ejecuta validaciones del schema
        });

        if (!updatedPost) {
            return res.status(404).send({ msg: "Post not found" });
        }

        res.status(200).send({ msg: "Post updated successfully" });
    } catch (error) {
        res.status(400).send({ msg: "Error updating post", error: error.message });
    }
}

module.exports = {
    createPost,
    getPost,
    updatePost
}
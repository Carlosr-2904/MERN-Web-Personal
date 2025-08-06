const Post = require('../models/post');
const image = require('../utils/image');

// function createPost(req,res){
//     const post = new Post(req.body);
//     post.created_at = new Date();

//     const imagePath = image.getFilePath(req.files.miniature, 'image');
//     post.miniature = imagePath;

//     post.save((err, postStored) => {
//         if(err){
//             return res.status(400).send({msg: "Error creating post"});
//         }else{
//             return res.status(201).send({post: postStored});
//         }
//     });
// }

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

module.exports = {
    createPost
}
const postService = require("./../../services/postService");

exports.getAllPosts =  async (req, res, next) => {
    try {
        posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch(error) {
        next(error);
    }
}

exports.getPost = async (req, res, next) => {
    try {
        post = await postService.getPostById(req.params.id);
        res.status(200).json(post);
    } catch(error) {
        next(error);
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const newPost = await postService.createPost(req.body);
        
        res.status(200).json({
            status: "success",
            post: newPost
        })
    } catch(error) {
        next(error);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const updatedPost = await postService.updatePostById(req.params.id, req.body)
        res.status(200).json({
            status: "success",
            post: updatedPost
        })
    } catch(error) {
        next(error);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const deletedPost = await postService.deletePostById(req.params.id)
        res.status(200).json({
            status: "success",
            data: deletedPost
        })
    } catch(error) {
        next(error);
    }
}
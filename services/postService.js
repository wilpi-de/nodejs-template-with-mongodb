const ApiError = require("../errors/apiError");
const postDAO = require("./../daos/postDAO");

    
exports.getAllPosts = async () => {
    const posts = await postDAO.getAll();
    return posts;
}

exports.getPostById = async (id) => {
    const post = await postDAO.getOneById(id);
    if(!post) {
        throw new ApiError("Der Beitrag konnte nicht gefunden werden.", 404);
    };
    return post;
}

exports.createPost = async (data) => {
    const newPost = await postDAO.create(data);
    return newPost;
}

exports.updatePostById = async (id, data) => {
    const updatedPost = await postDAO.updateById(id, data);
    return updatedPost;
} 

exports.deletePostById = async (id) => {
    const deletedPost = await postDAO.deleteById(id);
    return deletedPost;
} 
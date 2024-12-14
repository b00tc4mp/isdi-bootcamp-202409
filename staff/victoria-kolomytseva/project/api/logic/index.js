import {
    registerUser,
    authenticateUser,
    saveUser,
    getUserById
} from './users/index.js'


import {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    toggleLikePost,

    addComment,
    removeComment,
    getComments
} from './posts/index.js'


const logic = {
    registerUser,
    authenticateUser,
    saveUser,
    getUserById,
    getPostById,


    createPost,
    getPosts,
    getPostById,
    deletePost,
    toggleLikePost,

    addComment,
    removeComment,
    getComments
}

export default logic


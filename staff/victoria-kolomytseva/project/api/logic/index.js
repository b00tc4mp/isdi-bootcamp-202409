import {
    registerUser,
    authenticateUser,
    updateUserProfile,
    getUserById
} from './users/index.js'


import {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    toggleLikePost,
    petFound,

    addComment,
    removeComment,
    getComments
} from './posts/index.js'


const logic = {
    registerUser,
    authenticateUser,
    updateUserProfile,
    getUserById,
    getPostById,


    createPost,
    getPosts,
    getPostById,
    deletePost,
    toggleLikePost,
    petFound,

    addComment,
    removeComment,
    getComments
}

export default logic


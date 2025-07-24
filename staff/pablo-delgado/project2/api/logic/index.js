import {
    registerUser,
    authenticateUser,
    getUserName
} from './users/index.js'

import {
    createPost,
    deletePost,
    getPosts,
    toggleLikePost,

    addComment,
    removeComment,
    getComments,
    savePost,
    getSavedPosts
} from './posts/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    createPost,
    deletePost,
    getPosts,
    toggleLikePost,

    addComment,
    removeComment,
    getComments,
    savePost,
    getSavedPosts
}

export default logic
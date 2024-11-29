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
    toggleSavePost,

    addComment,
    removeComment,
    getComments
} from './posts/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    createPost,
    deletePost,
    getPosts,
    toggleLikePost,
    toggleSavePost,

    addComment,
    removeComment,
    getComments
}

export default logic
import {
    authenticateUser,
    registerUser,
    getUserName
} from './users/index.js'

import {
    createComment,
    getComments,
    removeComment,

    getPosts,
    createPost,
    deletePost,
    toggleLikePost
} from './posts/index.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,

    createComment,
    getComments,
    removeComment,

    getPosts,
    createPost,
    deletePost,
    toggleLikePost
}

export default logic
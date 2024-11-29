import {
    registerUser,
    loginUser,
    getUserName,
    getUser,
    getUserId,
    isUserLoggedIn,
    logoutUser,
    obtainUserData
} from './users'

import {
    removeComment,
    createComment,
    getComments,

    toggleLikePost,
    createPost,
    deletePost,
    getPosts
} from './posts'


const logic = {
    registerUser,
    loginUser,

    isUserLoggedIn,
    getUserName,
    getPosts,
    logoutUser,

    toggleLikePost,
    createPost,
    deletePost,
    getUserId,

    createComment,
    getComments,
    removeComment,

    getUser,
    obtainUserData
}

export default logic
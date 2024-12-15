
import {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserId,
    saveUser,
    getUser,
    getUserRole,
    isUserRoleModerator,
    isUserRoleRegular,

} from './users'


import {
    createPost,
    deletePost,
    getPosts,
    getPostById,
    toggleLikePost,

    addComment,
    removeComment,
    getComments
} from './posts'

const logic = {
    registerUser,
    loginUser,
    getUserId,
    saveUser,
    getUser,
    getUserRole,
    isUserLoggedIn,
    isUserRoleModerator,
    isUserRoleRegular,
    logoutUser,


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
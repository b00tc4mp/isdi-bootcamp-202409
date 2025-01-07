
import {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUserId,
    updateUserProfile,
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
    petFound,

    addComment,
    removeComment,
    getComments
} from './posts'

const logic = {
    registerUser,
    loginUser,
    getUserId,
    updateUserProfile,
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
    petFound,

    addComment,
    removeComment,
    getComments
}

export default logic
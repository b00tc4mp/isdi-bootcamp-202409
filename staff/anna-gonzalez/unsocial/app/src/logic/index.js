import {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    isUserRoleModerator,
    isUserRoleRegular,
    getUserId,
    logoutUser
} from './users'

import {
    createPost,
    deletePost,
    getPosts,
    toggleLikePost,
    toggleSavePost,

    addComment,
    removeComment,
    getComments
} from './posts'

const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    isUserRoleModerator,
    isUserRoleRegular,
    getUserId,
    logoutUser,

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
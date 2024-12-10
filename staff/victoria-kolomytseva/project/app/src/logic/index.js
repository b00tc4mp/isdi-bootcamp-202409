
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
    getPosts,
    getPostById
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
    getPostById
}

export default logic
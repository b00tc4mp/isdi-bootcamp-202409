
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
    getUserLocation
} from './users'


import {
    createPost,
    getPosts
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
    getUserLocation,

    createPost,
    getPosts
}

export default logic
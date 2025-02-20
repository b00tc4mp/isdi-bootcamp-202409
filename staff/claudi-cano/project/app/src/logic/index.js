import {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    getUserRole,
    isUserRoleModerator,
    isUserRoleRegular,
    getUserId,
    logoutUser,
} from './users'

import {
    createProduct,
    deleteProduct,
    getProducts,
    toggleLikeProduct,

    addComment,
    removeComment,
    getComments
} from './products'

const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    getUserRole,
    isUserRoleModerator,
    isUserRoleRegular,
    getUserId,
    logoutUser,

    createProduct,
    deleteProduct,
    getProducts,
    toggleLikeProduct,

    addComment,
    removeComment,
    getComments
}

export default logic
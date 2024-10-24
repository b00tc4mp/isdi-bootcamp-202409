import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserId from './getUserId'
import getUserName from './getUserName'
import logoutUser from './logoutUser'

import createPost from './createPost'
import deletePost from './deletePost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'
import toggleSavePost from './toggleSavePost'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserId,
    getUserName,
    logoutUser,

    createPost,
    deletePost,
    getPosts,
    toggleLikePost,
    toggleSavePost
}

export default logic
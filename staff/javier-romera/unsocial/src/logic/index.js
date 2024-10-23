import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import getUserUsername from './getUserUsername'
import logoutUser from './logoutUser'

import createPost from './createPost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'
import deletePost from './deletePost'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    getUserUsername,
    logoutUser,

    createPost,
    getPosts,
    toggleLikePost,
    deletePost
}

export default logic
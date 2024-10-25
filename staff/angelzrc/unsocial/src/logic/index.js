import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'
import getUserId from './getUserId'

import createPost from './createPost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,
    createPost,
    getPosts,
    toggleLikePost,
    getUserId
}

export default logic
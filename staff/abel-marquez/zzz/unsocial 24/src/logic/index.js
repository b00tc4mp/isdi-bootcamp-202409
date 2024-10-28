import registerUser from './registerUser.js'
import loginUser from './loginUser.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import getUserName from './getUserName.js'
import logoutUser from './logoutUser.js'
import getUserId from './getUserId.js'

import createPost from './createPost.js'
import getPosts from './getPosts.js'
import toggleLikePost from './toggleLikePost.js'
import deletePost from './deletePost.js'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,
    getUserId,
    deletePost,

    createPost,
    getPosts,
    toggleLikePost
}

export default logic
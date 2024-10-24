import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import getUserUsername from './getUserUsername'
import logoutUser from './logoutUser'
import getUserId from './getUserId'

import createPost from './createPost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'
import deletePost from './deletePost'

import getComments from './getComments'
import createComment from './createComment'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    getUserUsername,
    logoutUser,
    getUserId,

    createPost,
    getPosts,
    toggleLikePost,
    deletePost,

    getComments,
    createComment,
}

export default logic
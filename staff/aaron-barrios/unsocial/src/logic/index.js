import registerUser from './registerUser'
import loginUser from './loginUser'

import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import getUserId from './getUserId'
import logoutUser from './logoutUser'

import toggleLikePost from './toggleLikePost'
import createPost from './createPost'
import getPosts from './getPosts'
import deletePost from './deletePost'

import createComment from './createComment'
import getComments from './getComments'
import removeComment from './removeComment'


const logic = {
    registerUser,
    loginUser,

    isUserLoggedIn,
    getUserName,
    getPosts,
    logoutUser,

    toggleLikePost,
    createPost,
    deletePost,
    getUserId,

    createComment,
    getComments,
    removeComment
}

export default logic
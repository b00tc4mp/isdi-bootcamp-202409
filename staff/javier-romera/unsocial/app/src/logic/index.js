import registerUser from './registerUser'
import authenticateUser from './authenticateUser'
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
import addComment from './addComment'
import removeComment from './removeComment'

const logic = {
    registerUser,
    authenticateUser,
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
    addComment,
    removeComment,
}

export default logic
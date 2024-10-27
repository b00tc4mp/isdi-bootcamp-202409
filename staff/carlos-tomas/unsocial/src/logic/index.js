import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'
import getUserId from './getUserId'

import createPost from './createPost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'
import deletePost from './deletePost'

import addComment from './addComment'
import getComments from './getComments'
import removeComment from './removeComment'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,
    getUserId,

    createPost,
    getPosts,
    toggleLikePost,
    deletePost,

    addComment,
    getComments,
    removeComment
}

export default logic
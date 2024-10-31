import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'

import createPostLogic from './createPostLogic'
import getPosts from './getPosts'
import toggleLikePosts from './toggleLikePosts'
import getUserId from './getUserId'
import deletePost from './deletePost'
import addComments from './addComments'
import getComments from './getComments'
import removeComment from './removeComment'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,

    createPostLogic,
    getPosts,
    toggleLikePosts,
    getUserId,
    deletePost,
    addComments,
    getComments,
    removeComment
}

export default logic
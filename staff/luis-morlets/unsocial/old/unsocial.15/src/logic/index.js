import createPost from './createPost'
import deletePost from './deletePost'
import getPosts from './getPosts'
import likesInteraction from './likesInteraction'

import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import registerUser from './registerUser'
import getUserId from './getUserId'


import createComment from './createComment'
import getComments from './getComments'
import removeComment from './removeComment'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    getUserName,
    getUserId,

    getComments,
    createComment,
    removeComment,

    createPost,
    getPosts,
    deletePost,
    likesInteraction,
}

export default logic
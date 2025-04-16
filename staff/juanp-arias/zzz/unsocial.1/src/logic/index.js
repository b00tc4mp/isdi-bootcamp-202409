import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'

import createPostLogic from './createPostLogic'
import getPosts from './getPosts'
import toggleLikePosts from './toggleLikePosts'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,

    createPostLogic,
    getPosts,
    toggleLikePosts
}

export default logic
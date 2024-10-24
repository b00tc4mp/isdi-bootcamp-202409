import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import logoutUser from './logoutUser'

import createPost from './createPost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'

import deletePost from './deletePost'
import getUserId from './getUserId'
import getElapsedTime from '../utils/getElapsedTime'


const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,

    logoutUser,
    createPost,
    getPosts,
    toggleLikePost,

    deletePost,
    getUserId,

    //getElapsedTime //OJO !! 

}

export default logic
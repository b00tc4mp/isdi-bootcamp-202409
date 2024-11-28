import registerUser from './registerUser'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import getUserName from './getUserName'
import getUserData from './getUserData'
import logoutUser from './logoutUser'
import getUserRole from './getUserRole'
import isUserRoleModerator from './isUserRoleModerator'
import isUserRoleRegular from './isUserRoleRegular'

import createPost from './createPost'
import getPosts from './getPosts'
import toggleLikePost from './toggleLikePost'

import deletePost from './deletePost'
import getUserId from './getUserId'
//import getElapsedTime from '../utils/getElapsedTime'

import addComment from './addComment'
import getComments from './getComments'
import removeComment from './removeComment'
import getUsers from './getUsers'


const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    getUserData,
    getUserRole,
    isUserRoleModerator,
    isUserRoleRegular,


    logoutUser,
    createPost,
    getPosts,
    toggleLikePost,

    deletePost,
    getUserId,

    addComment,
    getComments,
    removeComment,

    getUsers

    //getElapsedTime //OJO !! 

}

export default logic
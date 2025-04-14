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
import getUserRole from './getUserRole'
import roleRegular from './roleRegular'
import roleModerator from './roleModerator'
import useContext from '../view/useContext'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,
    getUserId,

    getUserRole,
    roleRegular,
    roleModerator,

    createPostLogic,
    getPosts,
    toggleLikePosts,
    deletePost,
    addComments,
    getComments,
    removeComment,

    useContext
}

export default logic
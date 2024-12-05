import loginUser from './user/loginUser.js'
import logoutUser from './user/logoutUser.js'
import registerUser from './user/registerUser.js'
import isUserLoggedIn from './user/isUserLoggedIn.js'
import isUserModerator from './user/isUserModerator.js'
import isUserRoleRegular from './user/isUserRoleRegular.js'

import getUserId from './user/getUserId.js'
import getUserName from './user/getUserName.js'
import getUserRole from './user/getUserRole.js'

import addComment from './recommendation/addComment.js'
import getComments from './recommendation/getComments.js'
import removeComment from './recommendation/removeComment.js'

import createRecommend from './recommendation/createRecommend.js'
import deleteRecommend from './recommendation/deleteRecommend.js'
import getRecommend from './recommendation/getRecommend.js'

import downVoteToggle from './recommendation/downVoteToggle.js'
import upVoteToggle from './recommendation/upVoteToggle.js'


const logic = {
    loginUser,
    logoutUser,
    registerUser,
    isUserLoggedIn,
    isUserModerator,
    isUserRoleRegular,

    getUserId,
    getUserName,
    getUserRole,

    addComment,
    getComments,
    removeComment,

    createRecommend,
    deleteRecommend,
    getRecommend,

    downVoteToggle,
    upVoteToggle
}

export default logic
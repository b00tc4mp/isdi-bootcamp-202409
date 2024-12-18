import loginUser from './user/loginUser.js'
import logoutUser from './user/logoutUser.js'
import registerUser from './user/registerUser.js'
import isUserLoggedIn from './user/isUserLoggedIn.js'
import isUserModerator from './user/isUserModerator.js'
import isUserRoleRegular from './user/isUserRoleRegular.js'

import getUserId from './user/getUserId.js'
import getUserName from './user/getUserName.js'
import getUserRole from './user/getUserRole.js'

import addComment from './recommend/addComment.js'
import getComments from './recommend/getComments.js'
import removeComment from './recommend/removeComment.js'

import createRecommend from './recommend/createRecommend.js'
import deleteRecommend from './recommend/deleteRecommend.js'
import getRecommend from './recommend/getRecommend.js'
import getRecommendById from './recommend/getRecommendById.js'
import getRecommendByCategoryCoutry from './recommend/getRecommendByCategoryCountry.js'
import getRecommendByUser from './recommend/getRecommendByUser.js'

import downVoteToggle from './recommend/downVoteToggle.js'
import upVoteToggle from './recommend/upVoteToggle.js'


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
    getRecommendById,
    getRecommendByCategoryCoutry,
    getRecommendByUser,

    downVoteToggle,
    upVoteToggle
}

export default logic
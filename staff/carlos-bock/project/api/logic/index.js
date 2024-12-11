import {
    registerUser,
    authenticateUser,
    getUserName
} from './users/index.js'

import {
    addComment,
    createRecommend,
    deleteRecommend,
    downVote,
    getComments,
    getRecommend,
    getRecommendById,
    getRecommendByCategory,
    removeComment,
    upVote
} from './recommend/index.js'


const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    addComment,
    createRecommend,
    deleteRecommend,
    downVote,
    getComments,
    getRecommend,
    getRecommendById,
    getRecommendByCategory,
    removeComment,
    upVote
}


export default logic
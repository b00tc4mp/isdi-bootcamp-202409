import {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    getUserId,
    logoutUser,
    getUserStage,
    updateUserStage,
    getUserProfile,
    updateUserProfile,
    uploadUserPictures,
    deleteUserPicture,
    getPotentialMatches
} from './users'

import {
    createHeartbeat
} from './heartbeats'

import {
    getUserMatches,
    getMatchMessages,
    sendMessage,
    unmatchUser
} from './matches'

const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    getUserId,
    logoutUser,
    getUserStage,
    updateUserStage,
    getUserProfile,
    updateUserProfile,
    uploadUserPictures,
    deleteUserPicture,
    getPotentialMatches,
    createHeartbeat,
    getUserMatches,
    getMatchMessages,
    sendMessage,
    unmatchUser
}

export default logic
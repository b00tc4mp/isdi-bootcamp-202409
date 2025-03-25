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
    createHeartbeat
}

export default logic
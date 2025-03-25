import {
    registerUser,
    authenticateUser,
    getUserName,
    updateUserProfile,
    getUserStage,
    updateUserStage,
    getUserProfile,
    uploadUserPictures,
    deleteUserPicture,
    getPotentialMatches
} from './users/index.js'

import {
    createHeartbeat
} from './heartbeats/index.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    updateUserProfile,
    getUserStage,
    updateUserStage,
    getUserProfile,
    uploadUserPictures,
    deleteUserPicture,
    getPotentialMatches,
    createHeartbeat
}

export default logic
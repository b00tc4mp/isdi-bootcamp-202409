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

import { createHeartbeat } from './heartbeats/index.js'

import { getUserMatches, getMatchMessages, sendMessage, unmatchUser } from './matches/index.js'

import { getUnreadNotifications, markNotificationsAsRead } from './notifications/index.js'

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
    createHeartbeat,
    getUserMatches,
    getMatchMessages,
    sendMessage,
    unmatchUser,
    getUnreadNotifications,
    markNotificationsAsRead
}

export default logic
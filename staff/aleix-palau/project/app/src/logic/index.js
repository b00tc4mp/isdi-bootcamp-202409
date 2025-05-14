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

import {
    getUnreadNotifications,
    markMessageNotificationsAsRead,
    markMatchNotificationAsRead
} from './notifications'

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
    unmatchUser,
    getUnreadNotifications,
    markMessageNotificationsAsRead,
    markMatchNotificationAsRead
}

export default logic
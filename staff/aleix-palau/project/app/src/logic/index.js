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

import {
    getSpotifyAuthURL,
    connectSpotifyAccount,
    disconnectSpotifyAccount,
    getSpotifyStatus,
    searchSpotifyArtists
} from './spotify'

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
    markMatchNotificationAsRead,
    getSpotifyAuthURL,
    connectSpotifyAccount,
    disconnectSpotifyAccount,
    getSpotifyStatus,
    searchSpotifyArtists
}

export default logic
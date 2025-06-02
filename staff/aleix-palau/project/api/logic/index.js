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

import { getUnreadNotifications, markMessageNotificationsAsRead, markMatchNotificationAsRead } from './notifications/index.js'

import {
    getSpotifyAuthURL,
    connectSpotifyAccount,
    disconnectSpotifyAccount,
    getSpotifyStatus,
    searchSpotifyArtists,
    refreshSpotifyToken
} from './spotify/index.js'

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
    markMessageNotificationsAsRead,
    markMatchNotificationAsRead,
    getSpotifyAuthURL,
    connectSpotifyAccount,
    disconnectSpotifyAccount,
    getSpotifyStatus,
    searchSpotifyArtists,
    refreshSpotifyToken
}

export default logic
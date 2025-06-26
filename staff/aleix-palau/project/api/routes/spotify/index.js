import { Router } from 'express'

import { authorizationHandler } from '../helpers/index.js'
import {
    getSpotifyAuthURLHandler,
    spotifyCallbackHandler,
    disconnectSpotifyAccountHandler,
    getSpotifyStatusHandler,
    searchSpotifyArtistsHandler,
    refreshSpotifyTokenHandler
} from './handlers/index.js'

const spotifyRouter = Router()

// Get Spotify auth URL
spotifyRouter.get('/auth-url', authorizationHandler, getSpotifyAuthURLHandler)

// Spotify OAuth callback (no auth needed - Spotify redirects here)
spotifyRouter.get('/callback', spotifyCallbackHandler)

// Disconnect Spotify
spotifyRouter.delete('/disconnect', authorizationHandler, disconnectSpotifyAccountHandler)

// Get Spotify connection status
spotifyRouter.get('/status', authorizationHandler, getSpotifyStatusHandler)

// Search artists on Spotify
spotifyRouter.get('/search-artists', authorizationHandler, searchSpotifyArtistsHandler)

// Refresh Spotify token
spotifyRouter.post('/refresh-token', authorizationHandler, refreshSpotifyTokenHandler)

export default spotifyRouter
import logic from '../../logic/index.js'

export default () => {
    return logic.getSpotifyAuthURL()
        .then(authUrl => {
            // Redirect to Spotify authorization
            window.location.href = authUrl
        })
}
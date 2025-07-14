export default () => {
    const params = new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        scope: 'user-read-private user-read-email user-top-read',
        // We add state parameter when calling from frontend with userId
    })

    return `https://accounts.spotify.com/authorize?${params.toString()}`
}
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { code, state } = req.query

    if (!code)
        return res.redirect(`http://${process.env.VITE_APP_URL}/settings?error=spotify_auth_failed`)

    try {
        const userId = state // Pass userId as state in auth URL
        await logic.connectSpotifyAccount(userId, code)

        // Redirect back to the appropriate page
        const userStage = await logic.getUserStage(userId)
        if (userStage === 'artists')
            res.redirect(`http://${process.env.VITE_APP_URL}/setup/artists?spotify=connected`)
        else
            res.redirect(`http://${process.env.VITE_APP_URL}/settings?spotify=connected`)
    } catch (error) {
        console.error('Spotify callback error:', error)
        res.redirect(`http://${process.env.VITE_APP_URL}/settings?error=spotify_connection_failed`)
    }
})
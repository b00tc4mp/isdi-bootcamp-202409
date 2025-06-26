import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const authUrl = logic.getSpotifyAuthURL()

    res.json({ authUrl })
})
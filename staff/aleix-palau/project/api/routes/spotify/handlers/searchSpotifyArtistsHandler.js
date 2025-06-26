import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req
    const { query } = req.query

    if (!query || query.trim().length === 0)
        return res.json({ artists: [] })

    const artists = await logic.searchSpotifyArtists(userId, query)

    res.json({ artists })
})
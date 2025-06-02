import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req

    await logic.refreshSpotifyToken(userId)

    res.status(204).send()
})
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // from JWT token

    const potentialMatches = await logic.getPotentialMatches(userId)

    res.json(potentialMatches) // Sends the user's potential matches as JSON
})
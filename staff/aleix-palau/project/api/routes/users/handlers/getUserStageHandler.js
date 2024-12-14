import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req // Extracts userId from authorization middleware

    const stage = await logic.getUserStage(userId)

    res.json(stage) // Sends the user's current stage as JSON
})
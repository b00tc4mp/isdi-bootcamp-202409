import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req

    const { stage } = req.body

    await logic.updateUserStage(userId, stage)

    res.status(204).send() // No content response to indicate success
})
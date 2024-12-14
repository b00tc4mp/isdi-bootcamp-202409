import { Response } from 'express'
import { CustomRequest, UserScoreAndUsername } from '../../../types.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId, params: { targetUserId } } = req

    const userScoreAndUsername: UserScoreAndUsername = await logic.getUserScore(userId, targetUserId)

    res.json(userScoreAndUsername)
})
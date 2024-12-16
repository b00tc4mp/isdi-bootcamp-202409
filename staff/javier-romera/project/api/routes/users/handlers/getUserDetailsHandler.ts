import { Response } from 'express'
import { CustomRequest, UserDetails } from '../../../types.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId, params: { targetUserId } } = req

    const userScoreAndUsername: UserDetails = await logic.getUserDetails(userId, targetUserId)

    res.json(userScoreAndUsername)
})
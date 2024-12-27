import { Response } from 'express'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { CustomRequest } from '../../../types.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId, params: { targetUserId } } = req

    const name: string = await logic.getUserUsername(userId, targetUserId)

    res.json(name)
})
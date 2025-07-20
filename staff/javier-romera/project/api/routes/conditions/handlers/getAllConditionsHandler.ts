import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { Response } from 'express'
import { CustomRequest } from '../../../types.js'
import { TCondition } from 'dat'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId } = req

    const conditions: TCondition[] = await logic.getAllConditions(userId)

    res.json(conditions)
})
import { Response } from 'express'
import { CustomRequest } from '../../../types.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response) => {
    const { userId } = req

    await logic.deleteAnonymousUser(userId)

    res.status(204).send()
})
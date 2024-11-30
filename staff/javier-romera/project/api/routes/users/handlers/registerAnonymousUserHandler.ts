import { Request, Response } from 'express'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: Request, res: Response): Promise<void> => {
    const user = await logic.registerAnonymousUser()

    res.json(user)
})
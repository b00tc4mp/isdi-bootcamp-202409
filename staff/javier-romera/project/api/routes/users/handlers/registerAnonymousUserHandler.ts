import { Request, Response } from 'express'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { TUser } from 'dat'

export default createFunctionalHandler(async (req: Request, res: Response): Promise<void> => {
    const user: TUser = await logic.registerAnonymousUser()

    res.json(user)
})
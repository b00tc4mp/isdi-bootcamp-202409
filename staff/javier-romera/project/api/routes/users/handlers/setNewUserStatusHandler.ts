import { Response } from 'express'
import { CustomRequest } from '../../../types.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId, body: { status, from } } = req
    console.log(status)
    console.log(from)
    console.log(userId)

    await logic.setNewUserStatus(userId, status, from)

    res.status(204).send()
})
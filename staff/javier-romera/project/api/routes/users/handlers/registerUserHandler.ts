import { Response } from 'express'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { CustomRequest } from '../../../types.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId, body: { email, username, password, 'password-repeat': passwordRepeat } } = req

    await logic.registerUser(email, username, password, passwordRepeat, userId)

    res.status(201).send()
})
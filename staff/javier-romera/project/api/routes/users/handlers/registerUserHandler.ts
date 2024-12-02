import { Request, Response } from 'express'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, username, password, 'password-repeat': passwordRepeat } = req.body

    await logic.registerUser(email, username, password, passwordRepeat)

    res.status(201).send()
})
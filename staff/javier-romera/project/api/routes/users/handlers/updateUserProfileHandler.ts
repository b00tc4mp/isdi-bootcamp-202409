import { Response } from 'express'
import { CustomRequest } from '../../../types.js'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response) => {
    const { userId, body: { username, email, oldPassword, newPassword, newPasswordRepeat } } = req

    await logic.updateUserProfile(userId, username, email, oldPassword, newPassword, newPasswordRepeat)

    res.status(201).send()
})
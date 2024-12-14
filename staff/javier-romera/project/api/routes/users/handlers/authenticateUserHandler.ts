import jwt from 'jsonwebtoken'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { Response } from 'express'
import { CustomRequest, Payload } from '../../../types.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId, body: { username, password } } = req

    const { id, role }: Payload = await logic.authenticateUser(username, password, userId)

    const token = await jwt.sign({ sub: id, role }, process.env.JWT_SECRET!, { expiresIn: '14d' })

    res.json(token)
})
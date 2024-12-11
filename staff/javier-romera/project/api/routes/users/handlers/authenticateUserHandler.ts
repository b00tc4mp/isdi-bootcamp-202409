import jwt from 'jsonwebtoken'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { Request, Response } from 'express'
import { Payload } from '../../../types.js'

export default createFunctionalHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body

    const { id, role }: Payload = await logic.authenticateUser(username, password)

    const token = await jwt.sign({ sub: id, role }, process.env.JWT_SECRET!, { expiresIn: '14d' })

    res.json(token)
})
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

export default createFunctionalHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body

    const { id } = await logic.authenticatePlayer(username, password)

    const token = await jwt.sign({ sub: id }, process.env.JWT_SECRET!, { expiresIn: '14d' })

    res.json(token)
})
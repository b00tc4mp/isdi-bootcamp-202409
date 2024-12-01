import jwt from 'jsonwebtoken'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { Response } from 'express'
import { CustomRequest } from '../../../types.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response) => {
    const { userId } = req

    const character = await logic.getRandomCharacter(userId)

    res.json(character)
})
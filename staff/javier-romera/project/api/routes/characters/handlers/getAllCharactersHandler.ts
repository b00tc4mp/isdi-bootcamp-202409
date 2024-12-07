import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { Response } from 'express'
import { CustomRequest } from '../../../types.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response) => {
    const { userId } = req

    const characters = await logic.getAllCharacters(userId)

    res.json(characters)
})
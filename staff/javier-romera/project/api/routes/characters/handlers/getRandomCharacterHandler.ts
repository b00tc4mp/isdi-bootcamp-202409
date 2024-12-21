import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { Response } from 'express'
import { CustomRequest } from '../../../types.js'
import { TCharacter } from 'dat'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId } = req

    const character: TCharacter = await logic.getRandomCharacter(userId)

    res.json(character)
})
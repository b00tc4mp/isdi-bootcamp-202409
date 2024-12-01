import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import { Response } from 'express'
import { CustomRequest } from '../../../types.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response) => {
    const { userId, params: { charName } } = req

    const character = await logic.getCharacterByName(userId, charName)

    res.json(character)
})
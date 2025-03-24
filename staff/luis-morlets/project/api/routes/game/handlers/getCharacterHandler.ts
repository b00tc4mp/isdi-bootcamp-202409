import { Response } from 'express'
import { IRequest } from '../../../types.js'
import logic from '../../../logic/index.js'

import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: IRequest, res: Response) => {
    const { params: { characterId }, playerId } = req

    const character = await logic.getCharacter(playerId, characterId)

    res.json(character)
})
import { Response } from 'express'
import { IRequest } from '../../../types.js'
import logic from '../../../logic/index.js'

import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: IRequest, res: Response) => {
    const { params: { characterUuid }, playerId } = req

    const character = await logic.getCharacterByUuid(playerId, characterUuid)

    res.json(character)
})
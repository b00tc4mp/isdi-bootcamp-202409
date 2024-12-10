import { Response } from 'express'
import { IRequest } from '../../../types.js'
import logic from '../../../logic/index.js'

import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: IRequest, res: Response) => {
    const { playerId, params: { targetPlayerId } } = req

    const username = await logic.getPlayerUsername(playerId, targetPlayerId)

    res.json(username)
})
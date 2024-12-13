import { Response } from 'express'
import logic from '../../../logic/index.js'
import { IRequest } from '../../../types.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: IRequest, res: Response) => {
    const { playerId, params: { playerStateId } } = req

    await logic.deletePlayerState(playerId, playerStateId)

    res.status(204).send()
})
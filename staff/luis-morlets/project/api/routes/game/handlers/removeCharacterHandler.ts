import { Response } from 'express'
import { IRequest } from '../../../types.js'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: IRequest, res: Response) => {
    const { playerId, params: { playerStateId, characterId } } = req

    await logic.removeCharacter(playerId, playerStateId, characterId)

    res.status(204).send()
})
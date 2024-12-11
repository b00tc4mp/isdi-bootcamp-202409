import { Response } from 'express'
import { IRequest } from '../../../types.js'
import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: IRequest, res: Response) => {
    const { playerId } = req

    await logic.createPlayerState(playerId)

    res.status(201).send()
})
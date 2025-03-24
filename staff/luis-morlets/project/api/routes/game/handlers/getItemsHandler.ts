import { Response } from 'express'
import { IRequest } from '../../../types.js'
import logic from '../../../logic/index.js'

import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler(async (req: IRequest, res: Response) => {
    const { params: { playerId, itemId } } = req

    const items = await logic.getItem(playerId, itemId)

    res.json(items)
})
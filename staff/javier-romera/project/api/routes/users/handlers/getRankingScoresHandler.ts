import { Response } from 'express'
import { CustomRequest } from '../../../types.js'
import { createFunctionalHandler } from '../../helpers/index.js'
import logic from '../../../logic/index.js'
import { TUser } from 'dat/index.js'

export default createFunctionalHandler(async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId, params: { rankingLength } } = req
    const parsedRankingLength = Number(rankingLength)

    const scores: TUser[] = await logic.getRankingScores(userId, parsedRankingLength)

    res.json(scores)
})
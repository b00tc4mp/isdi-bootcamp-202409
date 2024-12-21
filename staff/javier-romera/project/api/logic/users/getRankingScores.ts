import { User, TUser } from 'dat'

import { validate, errors } from 'com'
const { NotFoundError, SystemError } = errors

export default (userId: string, rankingLength: number): Promise<TUser[]> => {
    validate.id(userId, 'userId')
    validate.rankingLength(rankingLength)

    return (async (): Promise<TUser[]> => {
        let user, scores, newRankingLength: number

        try {
            user = await User.findById<TUser>(userId)
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        newRankingLength = rankingLength + 10

        try {
            scores = await User.find({ role: 'regular' }).sort({ score: -1 }).select('score username -_id').limit(newRankingLength).lean<TUser[]>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        return scores
    })()
}
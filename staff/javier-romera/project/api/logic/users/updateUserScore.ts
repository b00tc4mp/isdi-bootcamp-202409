import { validate, errors } from 'com'
import { TUser, User } from 'dat'

const { NotFoundError, SystemError } = errors

export default (userId: string, score: number): Promise<void> => {
    validate.id(userId, 'userId')
    validate.score(score)

    return (async (): Promise<void> => {
        let user

        try {
            user = await User.findById(userId).lean<TUser>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        const newScore = user.score + score

        try {
            await User.updateOne<TUser>({ _id: userId }, { $set: { score: newScore } })
        } catch (error) {
            throw new SystemError((error as Error).message)
        }
    })()
}
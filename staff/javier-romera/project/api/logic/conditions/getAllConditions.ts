import { validate, errors } from 'com'
import { User, TUser, Condition, TCondition } from 'dat'
const { SystemError, NotFoundError } = errors

export default (userId: string): Promise<TCondition[]> => {
    validate.id(userId, 'userId')

    return (async (): Promise<TCondition[]> => {
        let user, conditions

        try {
            user = await User.findById<TUser>(userId)
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            conditions = await Condition.find().select('-_id').lean<TCondition[]>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        return conditions
    })()
}
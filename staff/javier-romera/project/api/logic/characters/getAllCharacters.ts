import { Character, TCharacter, User, TUser } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId: string): Promise<TCharacter[]> => {
    validate.id(userId, 'userId')

    return (async (): Promise<TCharacter[]> => {
        let user, characters

        try {
            user = await User.findById<TUser>(userId)
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            characters = await Character.find().select('-_id').populate('devilFruit', '-_id').populate('firstArc', '-_id').lean<TCharacter[]>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        return characters
    })()
}
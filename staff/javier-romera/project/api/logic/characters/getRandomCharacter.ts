import { Character, TCharacter, User, TUser } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId: string): Promise<TCharacter> => {
    validate.id(userId, 'userId')

    return (async (): Promise<TCharacter> => {
        let user, characters

        try {
            user = await User.findById(userId).lean<TUser>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            characters = await Character.find().populate('firstArc', 'name number -_id').populate('devilFruit', 'type -_id').select('-_id -description -race -town').lean<TCharacter[]>()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        const randomIndex = Math.floor(Math.random() * characters!.length)

        return characters![randomIndex]
    })()
}
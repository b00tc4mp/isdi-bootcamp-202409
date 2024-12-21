import { Character, TCharacter, User, TUser } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId: string, charName: string): Promise<TCharacter> => {
    validate.id(userId, 'userId')
    validate.characterName(charName)

    return (async (): Promise<TCharacter> => {
        let user
        let char

        try {
            user = await User.findById(userId).lean<TUser>()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            char = await Character.findOne({ $or: [{ name: charName }, { alias: charName }] }).populate('firstArc', 'name number -_id').populate('devilFruit', 'type -_id').select('-_id').lean<TCharacter>()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!char) throw new NotFoundError('character not found')

        return char
    })()
}
import { Character, User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId: string, charName: string) => {
    validate.id(userId, 'userId')
    validate.characterName(charName)

    return (async () => {
        let user
        let char

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        try {
            char = await Character.findOne({ $or: [{ name: charName }, { alias: charName }] }).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')
        if (!char) throw new NotFoundError('character not found')

        return char
    })()
}
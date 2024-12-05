import { Character, User } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId: string) => {
    validate.id(userId, 'userId')

    return (async () => {
        let user
        let characters

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            characters = await Character.find({}).select('name alias -_id').lean()
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        return characters
    })()
}
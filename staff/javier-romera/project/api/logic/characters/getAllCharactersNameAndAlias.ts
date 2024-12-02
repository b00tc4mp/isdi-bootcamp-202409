import { Character, User } from 'dat'
import { validate, errors } from 'com'

const { SystemError } = errors

export default (userId: string) => {
    validate.id(userId, 'userId')

    return (async () => {
        let characters

        try {
            characters = await Character.find({}).select('name alias -_id').lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        return characters
    })()
}
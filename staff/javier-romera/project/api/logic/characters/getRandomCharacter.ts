import { Character, User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId: string) => {
    validate.id(userId, 'userId')

    return (async () => {
        let user, characters

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            characters = await Character.find().populate('firstArc', 'name number -_id').populate('devilFruit', 'type -_id').select('-_id -description -race -town').lean()
        } catch (error) {
            if (error instanceof SystemError)
                throw new SystemError(error.message)
        }

        const randomIndex = Math.floor(Math.random() * characters!.length)

        return characters![randomIndex]
    })()
}
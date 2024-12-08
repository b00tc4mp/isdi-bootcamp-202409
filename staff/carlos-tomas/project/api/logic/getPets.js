import { User, Pet } from 'dat'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors


export default (userId) => {
    validate.id(userId, 'userid')

    return (async () => {

        try {
            const user = await User.findById(userId).lean()

            if (!user) {
                throw NotFoundError('user not found')
            }

            const pets = await Pet.find().lean()

            return pets


        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

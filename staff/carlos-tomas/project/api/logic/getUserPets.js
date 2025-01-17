import { User, Pet } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userid')
    return (async () => {
        let user
        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!user) {
            throw new NotFoundError('user not found')
        }

        let pets

        try {
            pets = await Pet.find().populate('owner').lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        pets.forEach(pet => {
            pet.id = pet._id.toString()
            delete pet._id
        })
        return pets

    })()
}
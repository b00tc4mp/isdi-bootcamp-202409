import { User, Pet } from 'dat'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

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
            pets = await Pet.find().lean()
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

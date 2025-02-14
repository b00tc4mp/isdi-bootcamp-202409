import { User, Pet, History } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, petId, type, text) => {
    validate.id(userId, 'userId')
    validate.id(petId, 'petId')
    validate.type(type)
    validate.text(text)


    return (async () => {
        let veterinary
        try {
            veterinary = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!veterinary) {
            throw new NotFoundError('user not found')
        }

        let pet
        try {
            pet = await Pet.findById(petId).lean()

        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!pet) {
            throw new NotFoundError('pet not found')
        }
        try {
            await History.create({ type, pet, veterinary, text })

        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}
import { User, Pet, History } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, petId, type, text) => {
    validate.id(userId, 'userId')
    validate.id(petId, 'petId')
    validate.type(type)
    validate.text(text)


    return (async () => {

        try {

            const veterinary = await User.findById(userId).lean()
            if (!veterinary) {
                throw NotFoundError('user not found')
            }

            const pet = await Pet.findById(petId).lean()
            if (!pet) {
                throw NotFoundError('pet not found')
            }

            await History.create({ type, pet, veterinary, text })

        } catch (error) {
            throw new SystemError(error.message)
        }


    })()
}
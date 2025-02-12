import { User, Pet, History } from 'dat'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, type, petId) => {
    validate.id(userId, 'userId')
    validate.type(type)
    validate.id(petId, 'petId')

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

        let pet
        try {
            pet = await Pet.findById(petId).lean()

        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!pet) {
            throw new NotFoundError('pet not found')
        }

        let histories
        try {
            histories = await History.find({ pet: petId, type }).sort({ date: -1 }).populate('veterinary', 'name').lean()

        } catch (error) {
            throw new SystemError(error.message)
        }
        histories.forEach(history => {
            history.id = history._id.toString()
            delete history._id
        })
        return histories
    })()
}

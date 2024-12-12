import { User, Pet, History } from 'dat'
import { errors, validate } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, type, petId) => {
    validate.id(userId, 'userId')
    validate.type(type)
    validate.id(petId, 'petId')


    return (async () => {

        try {
            const user = await User.findById(userId).lean()

            if (!user) {
                throw NotFoundError('user not found')
            }

            const pet = await Pet.findById(petId).lean()

            if (!pet) {
                throw NotFoundError('pet not found')
            }

            const histories = await History.find({ pet: petId, type }).sort({ date: -1 }).populate('veterinary', 'name').lean()

            histories.forEach(history => {
                history.id = history._id.toString()
                delete history._id
            })


            return histories

        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

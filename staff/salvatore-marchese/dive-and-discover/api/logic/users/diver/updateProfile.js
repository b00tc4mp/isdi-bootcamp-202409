import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId, data) => {
    validate.id(userId, 'userId')

    try {
        let user = await User.findById(userId).lean()
        if (!user) throw new NotFoundError('user not found')

        const dataToBeUpdated = {
            ...user,
            ...data
        }

        // Return the updated user directly
        return await User.findByIdAndUpdate(userId, dataToBeUpdated, { new: true }).lean()

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}
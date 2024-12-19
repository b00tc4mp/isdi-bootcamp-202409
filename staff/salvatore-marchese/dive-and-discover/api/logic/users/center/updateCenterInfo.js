import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId, data) => {
    validate.id(userId, 'userId')
    // TODO - VALIDATE THE ADDITIONAL INFO

    try {
        let user = await User.findById(userId).lean()
        if (!user) throw new NotFoundError('user not found')

        //const dataToBeUpdated = {address: data['address']}
        const dataToBeUpdated = {
            ...user,
            ...data
        }

        // Return the updated user directly
        // TODO - VALIDATE AND ASAVE THE ADDITIONAL INFO
        return await User.findByIdAndUpdate(userId, dataToBeUpdated, { new: true }).lean()

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
}
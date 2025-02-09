import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return (async () => {
        let user

        try {
            // lean() is used to retrieve lightweight plain JS objects instead of full Mongoose documents. It's ideal for read-only operations. If we're modifying the user document, which requires the full Mongoose document, we don't use it. Use .lean() in functions where you're only reading data, not updating it.
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        return user.stage || 'name-dob' // Default to 'name-dob' if no stage is set
    })()
}
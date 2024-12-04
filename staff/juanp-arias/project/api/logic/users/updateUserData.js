import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async function updateUserData(userId, name, email, dateOfBirth, role) {
    validate.id(userId, 'userId')
    validate.name(name)
    validate.email(email)
    validate.date(new Date(dateOfBirth))

    try {
        const user = await User.findById(userId).lean()
            .catch(error => { throw new SystemError(error.message) })
        if (!user) { throw new NotFoundError('user not found') }
        await User.findByIdAndUpdate(
            userId,
            { name, email, dateOfBirth, role },
            { new: true, runValidators: true })
    } catch (error) {
        throw new SystemError(error.message)
    }
}

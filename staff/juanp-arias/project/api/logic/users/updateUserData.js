import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default function updateUserData(userId, name, email, dateOfBirth, role) {
    validate.id(userId, 'userId')
    validate.name(name)
    validate.email(email)
    validate.date(new Date(dateOfBirth))

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findByIdAndUpdate(
                userId,
                { name, email, dateOfBirth, role },
                { new: true, runValidators: true }
            )
        })
        .catch(error => {
            if (error instanceof NotFoundError) throw error
            throw new SystemError(error.message)
        })
}
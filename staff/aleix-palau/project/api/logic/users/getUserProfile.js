import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return (async () => {
        let user

        try {
            user = await User.findById(userId).lean() // fetch user with all fields
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        const { name, dateOfBirth, gender, targetGender, artists, bio, location } = user

        return {
            name,
            dateOfBirth,
            gender,
            targetGender,
            artists,
            bio,
            location
        }
    })()
}
import { validate, errors } from 'com'
import { User } from 'dat'

const { SystemError, NotFoundError } = errors

export default (userId, name, surname, phone, city, postalCode) => {
    validate.id(userId)
    validate.name(name)
    validate.surname(surname)
    validate.phone(phone)
    validate.city(city)
    validate.postalCode(postalCode)

    return (async () => {
        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        try {
            await User.findByIdAndUpdate(userId, { name, surname, phone, city, postalCode })
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

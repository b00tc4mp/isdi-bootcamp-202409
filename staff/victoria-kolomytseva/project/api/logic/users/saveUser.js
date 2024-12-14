import { validate, errors } from 'com'
import { User } from 'dat'

const { SystemError } = errors

export default (id, name, surname, phone, city, postalCode) => {
    validate.name(name)
    // validate.surname(surname)
    // validate.phone(phone)
    // validate.city(city)
    // validate.postalCode(postalCode)

    return (async () => {
        try {
            await User.findByIdAndUpdate(id, { name, surname, phone, city, postalCode })
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

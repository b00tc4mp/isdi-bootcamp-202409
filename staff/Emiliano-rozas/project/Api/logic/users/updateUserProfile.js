import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, street, phone, city, country, postalCode) => {
    validate.id(userId, 'userId')
    validate.street(street, 'street')
    validate.phone(phone, 'phone')
    validate.text(city, 'city')
    validate.text(country, 'country')
    validate.postalCode(postalCode, 'postalCode')

    return User.findById(userId)
        .catch(error => {
            console.error(error)
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            user.street = street
            user.phone = phone
            user.city = city
            user.country = country
            user.postalCode = postalCode

            return user.save()

                .catch(error => {
                    console.error(error)
                    throw new SystemError(error.message)
                })
        })
        .then(_ => { })
}
import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors 

export default (name, email, password, passwordRepeat, addressLine1, addressLine2, country, city, postcode) => {
    validate.name(name)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat),
    validate.addressLine1(addressLine1),
    validate.addressLine2(addressLine2),
    validate.country(country),
    validate.city(city),
    validate.postcode(postcode)

    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await User.create({name, email, password: hash, addressLine1, addressLine2, country, city, postcode })
        } catch (error) {
            if (errorHandler.code === 11000) throw new DuplicityError('user already exists')
            
            throw new SystemError(error.message)
        }
    })()
}
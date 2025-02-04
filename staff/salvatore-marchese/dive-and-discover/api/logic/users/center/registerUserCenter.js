import bcrypt from 'bcryptjs'
import { User } from 'dat'
import { errors, validate } from 'com'


const { DuplicitiyError, SystemError } = errors

export default function registerUserCenter(name, email, password, passwordRepeat, address, country, city, postcode, telephone) {
    validate.name(name)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.address(address)
    validate.country(country)
    validate.city(city)
    validate.postcode(postcode)
    validate.telephone(telephone)

    //HASH PASSWORD
    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            //CREATE USER IN THE DB
            return User.create({ name, email, password: hash, address, country, city, postcode, telephone })
        })
        .catch(error => {
            // HANDLE SPECIFIC ERRORS
            if (error.code === 11000) {
                throw new DuplicitiyError('user already exists')
            }
            throw new SystemError(error.message)
        })
}
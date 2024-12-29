import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { errors, validate } from 'com'


const { DuplicityError, SystemError } = errors 

export default (name, email, password, passwordRepeat, address, country, city, postcode, telephone, role) => {
    validate.name(name)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.address(address)
    validate.country(country)
    validate.city(city)
    validate.postcode(postcode)
    validate.telephone(telephone)
    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await User.create({name, email, password: hash, address, country, city, postcode, role })
        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('user already exists') 
            
            throw new SystemError(error.message)
        }
    })()
} 
import { models } from 'dat'
import { validate, errors } from 'com'

const { User } = models
const { DuplicityError, SystemError } = errors

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

     // const user = new User({ name, email, username, password })
    // return user.save()

    // return new User({ name, email, username, password }).save()
    
    return  User.create({ name, email, username, password })
        .then(_=> { })
        .catch(error => {
            if (error.code === 11000) throw new DuplicityError('user already exists')

            throw new SystemError(error.message)
        })
}
import { User, Group } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default (userId, name, students) => {
    validate.id(userId, 'userId')
    validate.name(name)
    validate.students(students)
    
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Group.create({ name, teacher: userId, students })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
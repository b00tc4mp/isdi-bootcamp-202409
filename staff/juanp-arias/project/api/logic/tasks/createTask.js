import { User, Task, Group } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default (userId, groupId, date, text) => {
    validate.id(userId, 'userId')
    validate.id(groupId, 'groupId')
    validate.text(text)
    validate.date(new Date(date))

    return User.findById(userId)
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Group.findById(groupId)
                .lean()
                .then(group => {
                    if (!group) throw new NotFoundError('group not found')

                    const studentIds = group.students.map(student => student.toString())
                    return studentIds
                })
        })
        .then(studentIds => {
            return Task.create({ creator: userId, assignes: studentIds, date, text })
                .catch(error => { throw new SystemError(error.message) })
        })
        .catch(error => { throw new SystemError(error.message) })
}

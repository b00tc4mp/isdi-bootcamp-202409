import { User, Task, Group } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, ValidationError } = errors
export default (userId, groupId, date, text) => {
    validate.id(userId, 'userId')
    validate.id(groupId, 'groupId')
    validate.text(text)
    validate.date(new Date(date))

    const reminderDate = new Date(date)
    const now = new Date()

    const reminderDateOnly = new Date(reminderDate.getFullYear(), reminderDate.getMonth(), reminderDate.getDate())

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    if (reminderDateOnly < today) { throw new ValidationError('Cannot create tasks for past dates.') }

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Group.findById(groupId).lean()
                .catch(error => { throw new SystemError(error.message) })
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
}
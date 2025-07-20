import { User, Group } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Group.find({ teacher: userId })
                .populate('teacher', 'name')
                .populate('students', 'name role')
                .lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(groups => {
            groups.forEach(group => {
                group.id = group._id.toString()
                delete group._id
                if (group.teacher._id) {
                    group.teacher.id = group.teacher._id.toString()
                    delete group.teacher._id
                }
                group.students = group.students.map(student => ({
                    id: student._id.toString(),
                    name: student.name,
                    role: student.role
                }))
            })

            return groups
        })
}
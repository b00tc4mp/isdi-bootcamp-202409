import { User, Task } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors
export default (userId, taskId) => {
    validate.id(userId, 'userId')
    validate.id(taskId, 'taskId')

    return Promise.all([User.findById(userId).lean(), Task.findById(taskId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, task]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!task) throw new NotFoundError('task not found')
            if (!task.creator.equals(userId)) throw new OwnershipError('user is not author of task')

            return Task.findByIdAndDelete(taskId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
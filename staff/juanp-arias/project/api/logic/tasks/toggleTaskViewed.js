import { User, Task } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default (userId, taskId) => {
    validate.id(userId, 'userId')
    validate.id(taskId, 'taskId')

    return Promise.all([
        User.findById(userId).lean(),
        Task.findById(taskId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, task]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!task) throw new NotFoundError('task not found')

            const { viewed } = task
            if (!viewed.some(viewedUserId => viewedUserId.equals(userId))) { viewed.push(userId) }

            return task.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}
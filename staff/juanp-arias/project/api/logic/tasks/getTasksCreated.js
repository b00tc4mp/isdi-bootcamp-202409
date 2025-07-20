import { User, Task } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Task.find({ creator: userId })
                .populate('viewed', 'name')
                .populate('creator', 'name')
                .sort({ date: 1 })
                .lean()
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(tasks => {
            tasks.forEach(task => {
                task.id = task._id.toString()
                delete task._id

                if (Array.isArray(task.viewed)) {
                    task.viewed = task.viewed.map(viewedUser => {
                        return {
                            ...viewedUser,
                            id: viewedUser._id.toString(),
                            _id: undefined
                        }
                    })
                }

                if (task.creator && task.creator._id) {
                    task.creator.id = task.creator._id.toString()
                    delete task.creator._id
                }
            })

            return tasks
        })
}
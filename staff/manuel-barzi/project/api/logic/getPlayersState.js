import { validate, errors } from 'com'
import { User } from 'dat'

const { NotFoundError } = errors

export default userId => {
    validate.id(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.find({ _id: { $ne: userId } }, 'username coords').lean()
                .then(users => {
                    users.forEach(user => {
                        user.id = user._id.toString()
                        delete user._id

                        delete user.coords._id
                    })

                    return users
                })
        })
}
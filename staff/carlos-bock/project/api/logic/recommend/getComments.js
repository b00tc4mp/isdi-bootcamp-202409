import { User, Recommend } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const getComments = (userId, recommendId) => {
    validate.id(userId, 'userId')
    validate.id(recommendId, 'recommendId')

    return Promise.all([
        User.exists({ _id: userId }),
        Recommend.findById(recommendId).populate('comments.author', 'username').lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([userExists, recommend]) => {
            if (!userExists) throw new NotFoundError('user not found')
            if (!recommend) throw new NotFoundError('recommendation not found')

            const { comments } = recommend

            comments.forEach(comment => {
                comment.id = comment._id.toString()
                delete comment._id

                const { author } = comment

                if (author._id) {
                    author.id = author._id.toString()
                    delete author._id
                }
            })
            return comments
        })
}

export default getComments
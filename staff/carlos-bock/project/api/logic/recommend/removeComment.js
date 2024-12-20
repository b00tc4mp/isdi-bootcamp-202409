import { User, Recommend } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

const removeComment = (userId, recommendId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(recommendId, 'recommendId')
    validate.id(commentId, 'commentId')

    return Promise.all([
        User.findById(userId).lean(),
        Recommend.findById(recommendId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, recommend]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!recommend) throw new NotFoundError('recommendation not found')

            const comment = recommend.comments.id(commentId)

            if (!comment) throw new NotFoundError('comment not found')

            if (!comment.author.equals(userId)) throw new OwnershipError('user not recommendation author')

            comment.deleteOne({ _id: commentId })
            //recommend.comments.pull(commentId)
            return recommend.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

export default removeComment
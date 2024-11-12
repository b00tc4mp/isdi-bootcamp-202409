import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const objectUserId = new ObjectId(userId)
    const objectPostId = new ObjectId(postId)

    return Promise.all([
        db.users.findOne({ _id: objectUserId }),
        db.posts.findOne({ _id: objectPostId })
    ])
        .catch(error => { throw new SystemError(error.mesage) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { likes } = post
            const found = likes.some(objectUserId => objectUserId.equals(userId))

            if (found)
                return db.posts.updateOne({ _id: objectPostId }, { $pull: { likes: objectUserId } })
                    .catch(error => { throw new SystemError(error.message) })

            return db.posts.updateOne({ _id: objectPostId }, { $push: { likes: objectUserId } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
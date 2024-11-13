import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    return Promise.all([
        db.users.findOne({ _id: userObjectId }),
        db.posts.findOne({ _id: postObjectId })
    ])

        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!post) throw new NotFoundError('Post not found')

            const { saves } = post

            const found = saves.some(userObjectId => userObjectId.equals(userId))

            if (found)
                return db.posts.updateOne({ _id: postObjectId }, { $pull: { saves: userObjectId } })
                    .catch(error => { throw new SystemError(error.message) })

            return db.posts.updateOne({ _id: postObjectId }, { $push: { saves: userObjectId } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
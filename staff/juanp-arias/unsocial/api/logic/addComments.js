import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')
    validate.text(text)

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

            const newComment = {
                _id: new ObjectId,
                author: objectUserId,
                text: text,
                date: new Date
            }

            return db.posts.updateOne({ _id: objectPostId }, { $push: { comments: newComment } })
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
        .then(_ => { })
}
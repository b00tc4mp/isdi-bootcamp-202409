import db from 'dat'

import { validate, errors } from 'apu'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    const objectUserId = ObjectId.createFromHexString(userId)
    const objectPostId = ObjectId.createFromHexString(postId)

    return Promise.all([
        db.users.findOne({ _id: objectUserId }),
        db.posts.findOne({ _id: objectPostId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = {
                _id: new ObjectId,
                author: objectUserId,
                text,
                date: new Date
            }

            return db.posts.updateOne({ _id: objectPostId }, { $push: { comments: comment } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
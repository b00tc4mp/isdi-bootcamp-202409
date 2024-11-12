import db from 'dat'

import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors


export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')
    validate.text(text)

    const ObjectUserId = ObjectId.createFromHexString(userId)
    const ObjectPostId = ObjectId.createFromHexString(postId)

    return Promise.all([
        db.users.findOne({ _id: ObjectUserId }),
        db.posts.findOne({ _id: ObjectPostId })
    ])
        .catch((error) => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = {
                _id: new ObjectId,
                author: ObjectUserId,
                text,
                date: new Date
            }

            return db.posts.updateOne({ _id: ObjectPostId }, { $push: { comments: comment } })
                .catch((error) => { throw new SystemError(error.message) })
        })
        .then(() => { })
}


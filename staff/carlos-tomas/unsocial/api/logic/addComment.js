import db from 'dat'

import { errors, validate } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)
    validate.id(userId, 'userId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    return Promise.all([
        db.users.findOne({ _id: userObjectId }),
        db.posts.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = {
                _id: new ObjectId,
                author: userObjectId,
                text,
                date: new Date
            }

            return db.posts.updateOne({ _id: postObjectId }, { $push: { comments: comment } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}


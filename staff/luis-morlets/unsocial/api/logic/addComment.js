import db from 'dat'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const { ObjectId } = db

export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')
    validate.text(text)

    const userObjectId = ObjectId.createFromHexString(userId)
    const postObjectId = ObjectId.createFromHexString(postId)

    return Promise.all([
        db.users.findOne({ _id: userObjectId }),
        db.posts.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError("user not found");
            if (!post) throw new NotFoundError("post not found")

            return db.posts.updateOne({ _id: postObjectId },
                {
                    $push: {
                        comments: {
                            _id: new ObjectId(),
                            author: userObjectId,
                            text,
                            date: new Date(),
                        }
                    }
                })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}

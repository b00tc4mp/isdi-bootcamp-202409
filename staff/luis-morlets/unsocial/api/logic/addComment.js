import db from 'dat'

import { validate } from 'com'

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
        .catch(error => { throw new Error(error.message) })
        .then(([user, post]) => {
            if (!user) throw new Error("user not found");
            if (!post) throw new Error("post not found")

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
        })
}

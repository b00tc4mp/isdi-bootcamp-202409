import db from 'dat'

import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const ObjectUserId = new ObjectId(userId)
    const ObjectPostId = new ObjectId(postId)

    return Promise.all([
        db.users.findOne({ _id: ObjectUserId }),
        db.posts.findOne({ _id: ObjectPostId })
    ])
        .catch((error) => { new Error(error.message) })
        .then(([user, post]) => {
            if (!user) throw new Error('User not found')
            if (!post) throw new Error('post not found')

            const { likes } = post

            const liked = likes.some(id => id.equals(ObjectUserId))

            if (liked)
                return db.posts.updateOne({ _id: ObjectPostId },
                    { $pull: { likes: ObjectUserId } })
                    .catch(error => { throw new Error(error.message) })

            return db.posts.updateOne({ _id: ObjectPostId },
                { $push: { likes: ObjectUserId } })
                .catch(error => { throw new Error(error.message) })

        })
        .then((_) => { })

}



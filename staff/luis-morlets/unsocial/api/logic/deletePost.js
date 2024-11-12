import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, 'userId')

    const userObjectId = ObjectId.createFromHexString(userId)
    const postObjectId = ObjectId.createFromHexString(postId)

    return Promise.all([
        db.users.findOne({ _id: userObjectId }),
        db.posts.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new Error(error.message) })
        .then(([user, post]) => {
            if (!user) throw new Error('user not found')
            if (!post) throw new Error('post not found')

            const { author } = post

            if (!author.equals(userId)) { throw new Error('User is not author of this post') }

            return db.posts.deleteOne({ _id: postObjectId })
                .catch(error => { throw new Error(error.message) })
                .then(_ => { })
        })
}


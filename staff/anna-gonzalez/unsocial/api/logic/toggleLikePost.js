import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userIdObject = ObjectId.createFromHexString(userId)
    const postIdObject = ObjectId.createFromHexString(postId)

    return db.users.findOne({ _id: userIdObject })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.findOne({ _id: postIdObject })
                .catch(error => { new Error(error.message) })
        })
        .then(post => {
            if (!post) throw new Error('Post not found')

            const { likes } = post

            const found = likes.some(_id => _id.equals(userIdObject))

            if (!found)
                return db.posts.updateOne({ _id: postIdObject }, { $push: { likes: userIdObject } })

            else
                return db.posts.updateOne({ _id: postIdObject }, { $pull: { likes: userIdObject } })
        })
}
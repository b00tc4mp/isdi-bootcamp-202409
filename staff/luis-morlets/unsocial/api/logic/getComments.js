import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

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

            const { comments } = post

            const promises = comments.map(comment => {
                return db.users.findOne({ _id: comment.author })
                    .catch(error => { throw new Error(error.message) })
                    .then(user => {
                        if (!user) throw new Error('author of comment not found')

                        const { username } = user

                        comment.id = comment._id.toString()
                        delete comment._id

                        comment.author = { id: comment.author.toString(), username }

                        return comment
                    })
            })
            return Promise.all(promises)
        })
}


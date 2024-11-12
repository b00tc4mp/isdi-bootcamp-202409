import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const objectUserId = new ObjectId(userId)
    const objectPostId = new ObjectId(postId)

    return Promise.all([
        db.users.findOne({ _id: objectUserId }),
        db.posts.findOne({ _id: objectPostId }),
    ])
        .catch(error => { throw new Error(error.mesage) })
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

                        const { author: authorId } = comment

                        comment.id = comment._id.toString()
                        delete comment._id

                        comment.author = { id: authorId.toString(), username }

                        return comment
                    })
            })
            return Promise.all(promises)
        })
}
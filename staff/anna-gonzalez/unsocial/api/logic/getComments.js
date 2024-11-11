import db from 'dat'
import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userIdObject = new ObjectId(userId)
    const postIdObject = new ObjectId(postId)

    return db.users.findOne({ _id: userIdObject })
        .catch(error => { new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('User not found')

            return db.posts.findOne({ _id: postIdObject })
        })
        .then(post => {
            if (!post) throw new Error('Post not found')

            const { comments } = post

            const promises = comments.map(comment => {

                return db.users.findOne({ _id: comment.author })
                    .catch(error => { throw new Error(error.message) })
                    .then(user => {
                        if (!user) throw new Error('Author of comment not found')

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
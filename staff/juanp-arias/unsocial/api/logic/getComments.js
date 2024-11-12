import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const objectUserId = new ObjectId(userId)
    const objectPostId = new ObjectId(postId)

    return Promise.all([
        db.users.findOne({ _id: objectUserId }),
        db.posts.findOne({ _id: objectPostId }),
    ])
        .catch(error => { throw new SystemError(error.mesage) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            const promises = comments.map(comment => {
                return db.users.findOne({ _id: comment.author })
                    .catch(error => { throw new SystemError(error.message) })
                    .then(user => {
                        if (!user) throw new OwnershipError('author of comment not found')

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
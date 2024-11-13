import db from 'dat'
import { models } from 'dat'

import { validate, errors } from 'apu'

const { ObjectId } = db
const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const objectUserId = new ObjectId(userId)
    const objectPostId = new ObjectId(postId)

    return Promise.all([
        User.findOne({ _id: objectUserId }),
        Post.findOne({ _id: objectPostId }),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            const authorObjectIds = []

            comments.forEach(comment => {
                const { author: authorId } = comment

                const found = authorObjectIds.some(id => id.equals(authorId))

                if (!found) authorObjectIds.push(authorId)
            })

            return User.find({ _id: { $in: authorObjectIds } }, { username: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(authors => {
                    comments.forEach(comment => {
                        const { author: authorId } = comment

                        comment.id = comment._id.toString()
                        delete comment._id

                        const author = authors.find(({ _id }) => _id.equals(authorId))

                        const { _id, username } = author

                        comment.author = {
                            id: _id.toString(),
                            username
                        }
                    })
                    return comments
                })
        })
}
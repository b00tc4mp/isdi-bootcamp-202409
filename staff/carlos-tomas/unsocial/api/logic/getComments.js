import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(postId, 'postId')
    validate.id(userId, ' userId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    const { users, posts } = db

    return Promise.all([
        users.findOne({ _id: userObjectId }),
        posts.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            const authorObjectIds = []

            comments.forEach(comment => {
                const { author } = comment

                const found = authorObjectIds.some(authorObjectId => authorObjectId.equals(author))

                if (!found) authorObjectIds.push(author)
            })

            return users.find({ _id: { $in: authorObjectIds } }, { projection: { username: 1 } }).toArray()
                .catch(error => { throw new SystemError(error.message) })
                .then(authors => {
                    comments.forEach(comment => {
                        comment.id = comment._id.toString()
                        delete comment._id

                        const author = authors.find(({ _id }) => _id.equals(comment.author))

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
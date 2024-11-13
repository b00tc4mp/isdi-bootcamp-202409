import db from 'dat'
import { validate } from './helpers/index.js'
import { errors } from 'com'
import { models } from 'dat'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors
const { User, Post } = models


export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)


    return Promise.all([
        User.findOne({ _id: userObjectId }),
        Post.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            const authorObjectsId = []

            comments.forEach(comment => {
                const { author } = comment

                const found = authorObjectsId.some(authorObjectsId => authorObjectsId.equals(author))

                if (!found) authorObjectsId.push(author)
            })

            return User.find({ _id: { $in: authorObjectsId } }, { projection: { username: 1 } }).lean()
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
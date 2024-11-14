import { validate } from './helpers/index.js'
import { errors } from 'com'
import { models } from 'dat'

const { SystemError, NotFoundError } = errors
const { User, Post, Comment } = models


export default (userId, postId, text) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.text(text)

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = new Comment({
                author: userId,
                text,
                date: new Date
            })

            post.comments.push(comment)

            return post.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
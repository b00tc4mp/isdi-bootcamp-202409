import { models } from 'dat'
import { errors, validate } from 'com'


const { User, Post, Comment } = models
const { SystemError, NotFoundError } = errors

export default (userId, postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const comment = {
                author: userId,
                text,
                date: new Date
            }
            post.comments.push(comment)

            return post.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}


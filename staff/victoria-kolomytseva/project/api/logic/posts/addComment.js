import { User, Post, Comment } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

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
                text
            })
            post.comments.push(comment)


            return Promise.all([post.save(), comment.save()])
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
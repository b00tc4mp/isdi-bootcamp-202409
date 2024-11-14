import { models } from 'dat'

import { validate, errors } from 'apu'

const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.find({}).populate('author', 'username').lean().sort({ date: -1 })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, posts]) => {
            if (!user) throw new NotFoundError('user not found')
            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }

                const { likes, comments } = post

                post.liked = likes.some(id => id.equals(userId))

                post.likes = likes.length

                post.comments = comments.length
            })

            return posts
        })
}
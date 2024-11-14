import { models } from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return Promise.all(
        [User.findById(userId).lean(),
        Post.find().populate('author', 'username').sort({ date: -1 }).lean()
        ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, posts]) => {
            if (!user) throw new NotFoundError('User not found')

            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }

                const { likes, saves, comments } = post

                post.liked = likes.some(userObjectId => userObjectId.equals(userId))
                post.likes = likes.length

                post.saved = saves.some(userObjectId => userObjectId.equals(userId))
                post.saves = saves.length

                post.comments = comments.length
            })

            return posts
        })
}
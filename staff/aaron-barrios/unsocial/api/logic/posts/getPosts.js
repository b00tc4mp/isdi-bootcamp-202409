import { errors, validate } from 'com'
import { User, Post } from 'dat'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Post.find().populate('author', 'username').sort({ date: -1 }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, posts]) => {
            if (!user) throw new NotFoundError('user not found')

            posts.forEach(post => {
                //sanitize
                post.id = post._id.toString()
                delete post._id

                if (post.author._id) {
                    post.author.id = post.author._id.toString()
                    delete post.author._id
                }

                const { likes, comments } = post

                post.liked = likes.some(userObjectId => userObjectId.equals(userId))
                post.likes = likes.length

                post.comments = comments.length
            })

            return posts
        })
}
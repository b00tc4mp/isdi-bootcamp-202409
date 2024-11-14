import { models } from 'dat'
import { validate, errors } from 'com'


const { User, Post } = models
const { NotFoundError, SystemError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find().sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => {
            const promises = posts.map(post =>
                User.findById({ _id: post.author }, { username: 1 })
                    .then(user => {
                        if (!user) throw new NotFoundError('author of post not found')

                        const { username } = user

                        post.id = post._id.toString()
                        delete post._id

                        post.author = { id: post.author.toString(), username }

                        const { likes, comments } = post

                        post.liked = likes.some(userObjectId => userObjectId.equals(userId))
                        post.likes = likes.length

                        post.comments = comments.length

                        return post
                    })
            )

            return Promise.all(promises)
        })
}
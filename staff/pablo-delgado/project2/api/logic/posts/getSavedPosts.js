import { User, Post } from '../../../dat/index.js'
import { validate, errors } from '../../../com/index.js'

const { SystemError, NotFoundError } = errors

export default function getSavedPosts(userId) {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const savedPostsIds = user.savedPosts || []

            return Post.find({ _id: { $in: savedPostsIds } })
                .populate('author', 'username')
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(posts => posts.map(post => ({
            id: post._id.toString(),
            author: {
                id: post.author._id.toString(),
                username: post.author.username
            },
            image: post.image || '', 
            text: post.text || '',
            date: post.date,
            liked: false, 
            likes: post.likes?.length || 0,
            comments: post.comments?.length || 0
        })))
}

import { User, Post } from '../../../dat/index.js'
import { validate, errors } from '../../../com/index.js'
import mongoose from 'mongoose'

const { SystemError, NotFoundError } = errors

export default function savePost(userId, postId) {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const saved = user.savedPosts || []

            const postObjectId = new mongoose.Types.ObjectId(postId)

            const index = saved.findIndex(id => id.equals(postObjectId))

            if (index < 0)
                saved.push(postObjectId)
            else
                saved.splice(index, 1)

            user.savedPosts = saved

            console.log('GUARDANDO FAVORITOS:', user.savedPosts)

            return user.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => {})
}

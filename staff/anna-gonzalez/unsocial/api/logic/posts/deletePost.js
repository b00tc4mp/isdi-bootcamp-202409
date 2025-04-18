import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return (async () => {
        let user
        let post

        try {
            user = await User.findById(userId).lean()
            post = await Post.findById(postId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')
        if (!post) throw new NotFoundError('post not found')
        if (!post.author.equals(userId)) throw new OwnershipError('user is not author of post')

        try {
            await Post.deleteById(postId)
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
    //.then(_ => { })
}
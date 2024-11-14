import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const userObjectId = new ObjectId(userId) // ObjectId.createFromHexString(userId)
    const postObjectId = new ObjectId(postId) // ObjectId.createFromHexString(postId)

    const { users, posts } = db // per a la 18 i 19 no haver de fer db.users/db.posts

    return Promise.all([
        users.findOne({ _id: userObjectId }),
        posts.findOne({ _id: postObjectId })
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            const comment = comments.find(({ _id }) => _id.equals(commentId))

            if (!comment) throw new NotFoundError('comment not found')

            const { author } = comment

            if (!author.equals(userId)) throw new OwnershipError('user not author of comment')

            return posts.updateOne({ _id: postObjectId }, { $pull: { comments: { _id: new ObjectId(commentId) } } })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
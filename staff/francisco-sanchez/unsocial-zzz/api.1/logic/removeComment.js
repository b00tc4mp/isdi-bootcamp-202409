import db from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db

const { DuplicityError, SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)
    const commentObjectId = new ObjectId(commentId)


    return Promise.all([
        db.users.findOne({ _id: userObjectId }),
        db.posts.findOne({ _id: postObjectId }),

    ])

        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('Post not found')

            const { comments } = post
            //if (!comments) throw new Error('Comment not found')

            const found = comments.some(comment => comment._id.equals(commentObjectId))
            if (!found) throw new NotFoundError('comment not found')

            const isAuthor = post.comments.find(comment => comment.author.toString() === userObjectId.toString())

            if (!isAuthor) throw new OwnershipError('User is not the author of the comment');

            if (found)
                return db.posts.updateOne({ _id: postObjectId }, { $pull: { comments: { _id: commentObjectId } } })
                    .catch(error => { throw new SystemError(error.message) })

        })
        .then(_ => { })



    /* const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')

    const post = posts.find(({ id }) => id === postId)

    if (!post) throw new Error('post not found')

    const { comments } = post

    const index = comments.findIndex(({ id }) => id === commentId)

    if (index < 0)
        throw new Error('comment not found')

    const { author } = comments[index]

    if (author !== userId)
        throw new Error('user is not the author of the comment')


    comments.splice(index, 1)

    storage.posts = posts */
}
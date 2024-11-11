import db from 'dat'

import { validate } from 'com'

const { ObjectId } = db

export default (userId, postId, commentId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')
    const ObjectUserId = ObjectId.createFromHexString(userId)
    const ObjectPostId = ObjectId.createFromHexString(postId)

    return db.users
        .findOne({ _id: ObjectUserId })
        .catch((error) => {
            new Error(error.message)
        })
        .then(user => {
            if (!user) throw new Error('user not found')

            return db.posts
                .findOne({ _id: ObjectPostId })
                .catch(error => {
                    throw new Error(error.message)
                })
                .then(post => {
                    if (!post) throw new Error('post not found')

                    const { comments } = post

                    const comment = comments.find(comment => comment._id.toString() === commentId)

                    if (!comment) throw new Error('comment not found')
                    if (comment.author.toString() !== userId) throw new Error('Tomatela flaco')

                    return db.posts.updateOne(
                        { _id: ObjectPostId },
                        { $pull: { comments: { _id: ObjectId.createFromHexString(commentId) } } }
                    )
                })
                .catch(error => {
                    throw new Error(error.message);
                });
        })
}
//             
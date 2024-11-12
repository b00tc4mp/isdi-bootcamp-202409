import db from "../../dat/index.js"
import { validate } from "com"

const { ObjectId } = db

export default (userId, postId, commentId) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.id(commentId, 'commentId')

  const objectUserId = ObjectId.createFromHexString(userId)
  const objectPostId = ObjectId.createFromHexString(postId)
  const objectCommentId = ObjectId.createFromHexString(commentId)

  return db.users.findOne({ _id: objectUserId })
    .catch(error => { new Error(error.message) }) // System Error
    .then(user => {
      if (!user) throw new Error('user not found') // Not found Error

      return db.posts.findOne({ _id: objectPostId })
        .catch(error => { new Error(error.message) }) // System Error
        .then(post => {
          if (!post) throw new Error('post not found') // Not found Error

          const { comments } = post

          const comment = comments.find(comment => comment._id.equals(objectCommentId))

          if (!comment) throw new Error('comment not found') // Not found Error

          const { author } = comment

          if (author.toString() !== userId) throw new Error('user is not author of comment') // Ownership Error 403

          return db.posts.updateOne({ _id: objectPostId }, { $pull: { comments: { _id: objectCommentId } } })
            .catch(error => { new Error(error.message) }) // System Error
            .then(_ => { })

        })
    })
}
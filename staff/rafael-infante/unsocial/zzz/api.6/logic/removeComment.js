import db from "../../../dat/index.js"
import { validate, errors } from "com"

const { ObjectId } = db

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId, commentId) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.id(commentId, 'commentId')

  const objectUserId = ObjectId.createFromHexString(userId)
  const objectPostId = ObjectId.createFromHexString(postId)
  const objectCommentId = ObjectId.createFromHexString(commentId)

  return db.users.findOne({ _id: objectUserId })
    .catch(error => { new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      return db.posts.findOne({ _id: objectPostId })
        .catch(error => { new SystemError(error.message) })
        .then(post => {
          if (!post) throw new NotFoundError('post not found')

          const { comments } = post

          const comment = comments.find(comment => comment._id.equals(objectCommentId))

          if (!comment) throw new NotFoundError('comment not found')

          const { author } = comment

          if (author.toString() !== userId) throw new OwnershipError('user is not author of comment')

          return db.posts.updateOne({ _id: objectPostId }, { $pull: { comments: { _id: objectCommentId } } })
            .catch(error => { new SystemError(error.message) })
            .then(_ => { })

        })
    })
}
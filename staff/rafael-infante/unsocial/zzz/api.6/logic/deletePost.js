import db from "../../../dat/index.js"
import { validate, errors } from "com"

const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      return db.posts.findOne({ _id: ObjectId.createFromHexString(postId) })
        .catch(error => { new SystemError(error.message) })
        .then(post => {
          if (!post) throw new NotFoundError('post not found')

          const { author } = post

          if (author.toString() !== userId) throw new OwnershipError('user is not author of the post')

          return db.posts.deleteOne({ _id: ObjectId.createFromHexString(postId) })
            .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
    })


}
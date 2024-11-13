import { models } from 'dat'
import db from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models
const { ObjectId } = db
const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, postId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')

  return User.findOne({ _id: new ObjectId(userId) })
    .catch(error => { throw new SystemError(error.message) })
    .then((user) => {
      if (!user) throw new NotFoundError('user not found')

      const postObjectId = new ObjectId(postId)

      return Post.findOne({ _id: postObjectId })
        .catch(error => { throw new SystemError(error.message) })
        .then(post => {
          if (!post) throw new NotFoundError('post not found')
          if (!post.author.equals(userId)) throw new OwnershipError('user is not author of post')

          return Post.deleteOne({ _id: postObjectId })
            .catch((error) => { throw new SystemError(error.message) })
        })
        .then(_ => { })
    })
}
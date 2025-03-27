import db from '../../../dat/index.js'
import { validate, errors } from 'com'

const { ObjectId } = db

const { SystemError, NotFoundError } = errors

export default (postId, text, userId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')
  validate.text(text)

  const objectUserId = ObjectId.createFromHexString(userId)
  const objectPostId = ObjectId.createFromHexString(postId)

  return db.users.findOne({ _id: objectUserId })
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      return db.posts.findOne({ _id: objectPostId })
        .catch(error => { new SystemError(error.message) })
        .then(post => {
          if (!post) throw new NotFoundError('post not found')

          const comment = {
            _id: new ObjectId,
            author: objectUserId,
            text,
            date: new Date
          }

          return db.posts.updateOne({ _id: objectPostId }, { $push: { comments: comment } })
            .catch(error => { throw new SystemError(error.message) })
            .then(_ => { })
        })
    })

}
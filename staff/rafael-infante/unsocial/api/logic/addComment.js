import db from '../../dat/index.js'
import { validate } from 'com'

const { ObjectId } = db

export default (postId, text, userId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')
  validate.text(text)

  const objectUserId = ObjectId.createFromHexString(userId)
  const objectPostId = ObjectId.createFromHexString(postId)

  return db.users.findOne({ _id: objectUserId })
    .catch(error => { throw new Error(error.message) }) //Server Error
    .then(user => {
      if (!user) throw new Error('user not found') // Not Found Error

      return db.posts.findOne({ _id: objectPostId })
        .catch(error => { new Error(error.message) }) // Server Error
        .then(post => {
          if (!post) throw new Error('post not found') // Not Found Error

          const comment = {
            _id: new ObjectId,
            author: objectUserId,
            text,
            date: new Date
          }

          return db.posts.updateOne({ _id: objectPostId }, { $push: { comments: comment } })
            .catch(error => { throw new Error(error.message) }) // System Error
            .then(_ => { })
        })
    })

}
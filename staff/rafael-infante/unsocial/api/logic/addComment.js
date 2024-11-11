import db from '../../dat/index.js'
import validate from './helpers/validate.js'

const { ObjectId } = db

export default (postId, text, userId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')
  validate.text(text)

  const objectUserId = ObjectId.createFromHexString(userId)
  const objectPostId = ObjectId.createFromHexString(postId)

  return db.users.findOne({ _id: objectUserId })
    .catch(error => { throw new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.posts.findOne({ _id: objectPostId })
        .catch(error => { new Error(error.message) })
        .then(post => {
          if (!post) throw new Error('post not found')

          return db.posts.updateOne({ _id: objectPostId }, { $push: { comments: { _id: new ObjectId, author: objectUserId, text, date: new Date } } })
            .catch(error => { throw new Error(error.message) })
            .then(_ => { })
        })
    })

}
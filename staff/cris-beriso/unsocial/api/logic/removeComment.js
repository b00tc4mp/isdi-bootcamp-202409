import { validate } from 'com/index.js'

import db from 'dat'

const { ObjectId } = db

export default (userId, postId, commentId) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.id(commentId, 'commentId')

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      const postObjectId = new ObjectId(postId)

      return db.posts.findOne({ _id: postObjectId })
        .catch(error => { new Error(error.message) })
        .then(post => {
          if (!post) throw new Error('post not found')

          return db.posts
            .updateOne({ _id: ObjectId.createFromHexString(postId) }, { $pull: { comments: { _id: ObjectId.createFromHexString(commentId) } } })
            .then((comment) => {
              if (!comment) throw new Error('comment not found')
            })
            .catch((error) => { throw new Error(error.message) })
        })
        .then(_ => { })
    })
}
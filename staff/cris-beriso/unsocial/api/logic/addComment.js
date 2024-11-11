import { validate } from 'com/index.js';

import db from 'dat'

const { ObjectId } = db

export default (userId, postId, text) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.text(text)

  const postObjectId = ObjectId.createFromHexString(postId)
  const userObjectId = ObjectId.createFromHexString(userId)

  return db.users.findOne({ _id: userObjectId })
    .catch(error => { new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.posts.findOne({ _id: postObjectId })
        .catch(error => { new Error(error.message) })
        .then(post => {
          if (!post) throw new Error('post not found')

          return db.posts
            .updateOne({ _id: postObjectId }, { $push: { comments: { _id: new ObjectId(), author: userObjectId, text, date: new Date } } })
            .then((post) => {
              if (!post) throw new Error('post not found')
            })
            .catch((error) => {
              throw new Error(error.message)
            })
        })
        .then(_ => { })
    })
}
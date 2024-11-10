import { validate } from 'com/index.js';

import db from 'dat'

const { ObjectId } = db

export default (userId, postId, text) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.text(text)

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.posts.findOne({ _id: ObjectId.createFromHexString(postId) })
        .catch(error => { new Error(error.message) })
        .then(post => {
          if (!post) throw new Error('post not found')

          return db.posts
            .updateOne({ _id: ObjectId.createFromHexString(postId) }, { $push: { comments: { _id: new ObjectId(), author: ObjectId.createFromHexString(userId), text, date: new Date } } })
            .then((post) => {
              if (!post) throw new Error('post not found')
            })
            .then(() => {
              console.log('Created comment')
            })
            .catch((error) => {
              throw new Error(error.message)
            })
        })
    })
}
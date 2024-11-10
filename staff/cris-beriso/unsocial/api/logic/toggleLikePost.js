import { validate } from 'com/index.js'

import db from 'dat'

const { ObjectId } = db

export default (userId, postId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      let userLiked;

      return db.posts.findOne({ _id: ObjectId.createFromHexString(postId) })
        .catch(error => { new Error(error.message) })
        .then(post => {
          if (!post) throw new Error('post not found')

          userLiked = post.likes.some(element => element._id.equals(ObjectId.createFromHexString(userId)))

          return db.posts
            .updateOne({ _id: ObjectId.createFromHexString(postId) }, userLiked
              ? { $pull: { likes: { _id: ObjectId.createFromHexString(userId) } } }
              : { $push: { likes: { _id: ObjectId.createFromHexString(userId) } } })

            .then(() => {
              console.log(userLiked ? 'Unliked' : 'Liked')
            })
            .catch((error) => {
              throw new Error(error.message)
            })
        })
    })
}
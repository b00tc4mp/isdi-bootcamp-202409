import db from 'dat'
import { validate } from 'com/index.js'

const { ObjectId } = db;

export default (userId, postId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { new Error(error.message) })
    .then((user) => {
      if (!user) throw new Error('user not found')

      return db.posts.deleteOne({ _id: ObjectId.createFromHexString(postId) })
        .then((post) => { if (!post) throw new Error('post not found') })
        .then(_ => { console.log('Deleted post') })
        .catch((error) => {
          throw new Error(error.message)
        })
    })
}
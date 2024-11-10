import db from 'dat'
import { validate } from 'com/index.js'

const { ObjectId } = db;

export default (userId, image, text) => {
  validate.id(userId, 'userId')
  validate.image(image)
  validate.text(text)

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { new Error(error.message) })
    .then((user) => {
      if (!user) throw new Error('user not found')

      return db.posts.insertOne({ author: userId, image, text, date: new Date, likes: [], comments: [] })
        .then((user) => {
          if (!user) throw new Error('user not found')
        })
        .then(_ => {
          console.log('Created post')
        })
        .catch((error) => {
          throw new Error(error.message)
        })
    })
}
import db from "../../dat/index.js"
import { validate } from "./helpers/index.js"

const { ObjectId } = db

export default (userId, image, text) => {
  validate.id(userId, 'userId')
  validate.image(image)
  validate.text(text)

  return db.users.findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch(error => { new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.posts.insertOne({ _id: new ObjectId(), image, text, author: userId, date: new Date, likes: [], comments: [] })
        .catch(error => { throw new Error(error.message) })
        .then(_ => { })
    })
}
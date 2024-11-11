import db from "../../dat/index.js"
import { validate } from "./helpers/index.js"

const { ObjectId } = db

export default (userId, image, text) => {
  validate.id(userId, 'userId')
  validate.image(image)
  validate.text(text)

  const objectUserId = ObjectId.createFromHexString(userId)

  return db.users.findOne({ _id: objectUserId })
    .catch(error => { throw new Error(error.message) })
    .then(user => {
      if (!user) throw new Error('user not found')

      return db.posts.insertOne({ image, text, author: objectUserId, date: new Date, likes: [], comments: [] })
        .catch(error => { throw new Error(error.message) })
        .then(_ => { })
    })
}
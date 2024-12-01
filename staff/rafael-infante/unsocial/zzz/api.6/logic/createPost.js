import db from "../../../dat/index.js"
import { validate, errors } from "com"

const { ObjectId } = db

const { NotFoundError, SystemError } = errors

export default (userId, image, text) => {
  validate.id(userId, 'userId')
  validate.image(image)
  validate.text(text)

  const objectUserId = ObjectId.createFromHexString(userId)

  return db.users.findOne({ _id: objectUserId })
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      return db.posts.insertOne({ image, text, author: objectUserId, date: new Date, likes: [], comments: [] })
        .catch(error => { throw new SystemError(error.message) })
        .then(_ => { })
    })
}
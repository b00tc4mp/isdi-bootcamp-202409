import { models } from 'dat'
import db from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models
const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, image, text) => {
  validate.id(userId, 'userId')
  validate.image(image)
  validate.text(text)

  const userObjectId = new ObjectId(userId) //metodo factoria

  return User.findOne({ _id: userObjectId })
    .catch(error => { throw new SystemError(error.message) })
    .then((user) => {
      if (!user) throw new NotFoundError('user not found')

      return Post.create({ author: userObjectId, image, text, date: new Date, likes: [], comments: [] })
        .catch((error) => { throw new SystemError(error.message) })
    })
    .then(_ => { })
}
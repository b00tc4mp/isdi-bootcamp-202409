import { models } from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models
const { NotFoundError, SystemError } = errors

export default (userId, image, text) => {
  validate.id(userId, 'userId')
  validate.image(image)
  validate.text(text)

  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      return Post.create({
        author: userId,
        image,
        text,
        date: new Date,
        likes: [],
        comments: []
      })
        .catch(error => error => { throw new SystemError(error.message) })
    })
    .then(_ => { })
}
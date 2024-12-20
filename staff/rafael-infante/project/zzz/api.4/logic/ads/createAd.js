import { User, Ad } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, files, text) => {
  validate.id(userId, 'userId')
  validate.files(files)
  validate.text(text)

  return User.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError('user not found')

      return Ad.create({
        author: userId,
        image: files[0],
        text,
      }).catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}

import { User, Ad } from 'dat'
import { validate, errors } from 'com'

const { NotFoundError, SystemError } = errors

export default (userId, files, text, location) => {
  validate.id(userId, 'userId')
  validate.files(files)
  validate.text(text)
  validate.location(location)

  return User.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (!user) throw new NotFoundError('user not found')

      return Ad.create({
        author: userId,
        files: files[0],
        text,
        location: {
          type: 'Point',
          coordinates: location.coordinates,
          address: location.address,
        },
      }).catch((error) => {
        throw new SystemError(error.message)
      })
    })
    .then((_) => {})
}

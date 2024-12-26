import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, productId) => {
  validate.id(userId, 'userId')
  validate.id(productId, 'productId')

  return Promise.all([
    User.findById(userId),
    Product.findById(productId).lean()
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, product]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!product) throw new NotFoundError('product not found')

      const { wishlist } = user

      const index = wishlist.findIndex(productObjectId => productObjectId.equals(productId))
      let saved = false

      if (index < 0) {
        wishlist.push(productId)
        saved = true
      } else
        wishlist.splice(index, 1)

      return user.save()
        .catch(error => { throw new SystemError(error.message) })
    })
    .then(_ => { })
}
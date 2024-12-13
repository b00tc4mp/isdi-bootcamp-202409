import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, productId) => {
  validate.id(userId, 'userId')
  validate.id(productId, 'productId')

  return Promise.all([
    User.findById(userId),
    Product.findById(productId).populate('storePrices.store', 'name web locations').lean()
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, product]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!product) throw new NotFoundError('product not found')

      const { storePrices } = product

      storePrices.forEach(storePrice => {
        storePrice.id = storePrice._id.toString()
        delete storePrice._id

        storePrice.store.id = storePrice.store._id.toString()
        delete storePrice.store._id
      })

      return storePrices
    })
}
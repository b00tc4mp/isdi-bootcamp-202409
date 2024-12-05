import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, productId) => {
  validate.id(userId, 'userId')
  validate.id(productId, 'productId')

  return Promise.all([
    User.findById(userId).lean(),
    Product.findById(productId)
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, product]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!product) throw new NotFoundError('product not found')

      const { dislikes } = product

      const index = dislikes.findIndex(userObjectId => userObjectId.equals(userId))

      if (index < 0)
        dislikes.push(userId)
      else
        dislikes.splice(index, 1)

      return product.save()
        .catch(error => { throw new SystemError(error.message) })
    })
    .then(_ => { })
}

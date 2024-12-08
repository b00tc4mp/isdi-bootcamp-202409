import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
  validate.id(userId, 'userId')

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      const { wishlist } = user

      return Promise.all(
        wishlist.map(productId =>
          Product.findById(productId).lean()
            .catch(() => { throw new NotFoundError('product not found') })
            .then(product => {
              product.id = product._id.toString()
              delete product._id

              const { likes, dislikes } = product

              product.likes = likes.length
              product.dislikes = dislikes.length

              return product
            })
        )
      )
    })
}
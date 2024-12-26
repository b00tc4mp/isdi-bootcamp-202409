import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, productId) => {
  validate.id(userId, 'userId')
  validate.id(productId, 'productId')

  return Promise.all([
    //User.exists({ _id: userId }),
    User.findById(userId).lean(),
    Product.findById(productId).lean()
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, product]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!product) throw new NotFoundError('product not found')
      if (product._id) {
        product.id = product._id.toString()
        delete product._id
      }

      const { wishlist } = user
      const saved = wishlist.some(productObjectId => productObjectId.equals(productId))

      product.saved = saved

      const { likes, dislikes } = product

      product.liked = likes.some(userObjectId => userObjectId.equals(userId))
      product.likes = likes.length

      product.disliked = dislikes.some(userObjectId => userObjectId.equals(userId))
      product.dislikes = dislikes.length

      return product
    })
}
import { User, Product } from 'dat'

import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, category, keyword = null) => {
  validate.id(userId, 'userId')
  validate.category(category)

  if (keyword) {
    validate.keyword(keyword)
  }

  const query = { category }

  if (keyword) {
    query.description = { $regex: keyword, $options: 'i' }
  }

  return Promise.all([
    User.findById(userId).lean(),
    Product.find(query).sort({ name: 1 }).lean()
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, products]) => {
      if (!user) throw new NotFoundError('user not found')

      products.forEach(product => {
        product.id = product._id.toString()
        delete product._id

        const { likes, dislikes, comments } = product

        product.liked = likes.some(userObjectId => userObjectId.equals(userId))
        product.likes = likes.length

        product.disliked = dislikes.some(userObjectId => userObjectId.equals(userId))
        product.dislikes = dislikes.length

        products.comments = comments.length
      })

      return products
    })
}
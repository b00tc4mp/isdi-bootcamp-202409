import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, productId) => {
  validate.id(userId, 'userId')
  validate.id(productId, 'productId')

  return Promise.all([
    User.exists({ _id: userId }),
    Product.findById(productId).populate('comments.author', 'username').lean()
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([userExists, product]) => {
      if (!userExists) throw new NotFoundError('user not found')
      if (!product) throw new NotFoundError('product not found')

      const { comments } = product

      comments.forEach(comment => {
        comment.id = comment._id.toString()
        delete comment._id

        const { author } = comment

        if (author._id) {
          author.id = author._id.toString()
          delete author._id
        }
      })

      return comments
    })
}
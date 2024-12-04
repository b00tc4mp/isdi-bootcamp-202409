import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, productId, commentId) => {
  validate.id(userId, 'userId')
  validate.id(productId, 'productId')
  validate.id(commentId, 'commentId')

  return Promise.all([
    User.findById(userId).lean(),
    Product.findById(productId)
  ])

    .catch(error => { throw new SystemError(error.message) })
    .then(([user, product]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!product) throw new NotFoundError('product not found')

      const comment = product.comments.id(commentId)

      if (!comment) throw new NotFoundError('comment not found')

      if (!comment.author.equals(userId)) throw new OwnershipError('user not author of comment')

      comment.deleteOne({ _id: commentId })

      return product.save()
        .catch(error => { throw new SystemError(error.message) })
    })
    .then(_ => { })
}
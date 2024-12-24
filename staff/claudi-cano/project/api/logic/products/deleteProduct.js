import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, productId) => {
    validate.id(userId, 'userId')
    validate.id(productId, 'productId')

    return Promise.all([User.findById(userId).lean(), Product.findById(productId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, product]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!product) throw new NotFoundError('product not found')
            if (!product.author.equals(userId)) throw new OwnershipError('user is not author of product')

            return Product.deleteById(productId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
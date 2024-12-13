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

            const { likes } = product

            const index = likes.findIndex(userObjectId => userObjectId.equals(user.id))

            if (index < 0)
                likes.push(userId)
            else
                likes.splice(index, 1)

            return product.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
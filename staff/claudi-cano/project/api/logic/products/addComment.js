import { User, Product, Comment } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

export default (userId, productId, text) => {
    validate.id(userId, 'userId')
    validate.id(productId, 'productId')
    validate.text(text)

    return Promise.all([
        User.findById(userId).lean(),
        Product.findById(productId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, product]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!product) throw new NotFoundError('product not found')

            const comment = new Comment({
                author: userId,
                text
            })

            product.comments.push(comment)

            return product.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}
import { User, Product } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Product.find().populate('author', 'username').sort({ date: -1 }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, products]) => {
            if (!user) throw new NotFoundError('user not found')

            products.forEach(product => {
                product.id = product._id.toString()
                delete product._id

                if (product.author._id) {
                    product.author.id = product.author._id.toString()
                    delete product.author._id
                }

                const { likes, comments } = product

                product.liked = likes.some(userObjectId => userObjectId.equals(userId))
                product.likes = likes.length

                product.comments = comments.length
            })

            return products
        })
}
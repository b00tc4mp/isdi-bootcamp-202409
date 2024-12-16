import { Product } from 'dat'
import { errors } from 'com'

const { SystemError, NotFoundError } = errors

export default () => {
    return Product.find() // Buscamos todos los productos y nos lo devuelve en un array
        .populate('reviews.author', 'username') // Le mandamos autores a las reseñas (sino daría un ID)
        .lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(products => {
            if (!products || products.length === 0) {
                throw new NotFoundError('No products found')
            }

            // Saneamos los _id para que todo sea con id
            products.forEach(product => {
                product.id = product._id.toString()
                delete product._id

                product.reviews.forEach(review => {
                    review.id = review._id.toString()
                    delete review._id

                    // Si existe el autor y tiene un _id, lo ajustamos.
                    if (review.author && review.author._id) {
                        review.author.id = review.author._id.toString()
                        delete review.author._id
                    }
                })
            })
            return products
        })
}

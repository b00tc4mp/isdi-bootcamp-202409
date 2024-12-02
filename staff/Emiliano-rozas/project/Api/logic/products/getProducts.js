import { Product } from 'dat';
import { errors } from 'com'

const { SystemError } = errors

export default async () => {
    try {
        const products = await Product.find() //buscamos todos los productos y nos lo devuelve en un array
            .populate('reviews.author', 'username') //le mandamos autores a las reseñas (sino daria un id)
            .lean()

        products.forEach(product => {
            product.id = product._id.toString()
            delete product._id
            //saneamos los _id para que todo sea con id
            product.reviews.forEach(review => {
                review.id = review._id.toString()
                delete review._id

                //Si existe el autor y tiene un _id, lo ajustamos.
                if (review.author && review.author._id) {
                    review.author.id = review.author._id.toString()
                    delete review.author._id
                }
            })
        })
        return products
    } catch (error) {
        console.error('Error while getting products:', error)
        throw new SystemError(error.message)
    }
}
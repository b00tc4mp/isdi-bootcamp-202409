import { Order } from 'dat'
import { errors } from 'com'

const { SystemError } = errors

export default async () => { //agregar userId , token  ,trer el rol de admin, si lo es traemos todas , si no solo las del usuario.
    try {
        const orders = await Order.find().populate({
            path: 'user', // Poblamos el usuario para obtener sus datos completos
            select: 'name ', // Solo los campos necesarios
        }).populate({
            path: 'items',
            populate: {
                path: 'product',
                model: 'Product',
            },
        }).lean()

        orders.forEach(order => {
            order.id = order._id.toString()
            delete order._id

            const { user, items } = order

            if (user && user._id) {
                user.id = user._id.toString()
                delete user._id
            }

            if (items) {
                items.forEach(item => {
                    item.id = item._id.toString()
                    delete item._id

                    if (item.product) {
                        item.product.id = item.product._id.toString()
                        delete item.product._id
                    }
                    // if (item.product.reviews) {
                    //     item.product.reviews.forEach(review => {
                    //         review.id = review._id.toString()
                    //         delete review._id
                    //         if (review.author && review.author._id) {
                    //             review.author.id = review.author._id.toString();
                    //             delete review.author._id;
                    //         }
                    //     })
                    // }
                })
            }

            //     items.forEach(item => {
            //         if (item.product && item.product._id) {
            //             item.product.id = item.product._id.toString()
            //             delete item.product._id
            //         }
            //     })
        })
        return orders

    } catch (error) {
        console.error('Error while getting orders:', error)
        throw new SystemError(error.message)
    }
}
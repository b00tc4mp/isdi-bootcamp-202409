import { Order } from 'dat'
import { validate, errors } from 'com'


const { SystemError, NotFoundError } = errors

export default (orderId, status) => {
    validate.id(orderId, 'orderId')
    validate.status(status, 'order')

    return Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    ).catch(error => {
        throw new SystemError(error.message)
    })
        .then(updatedOrder => {
            if (!updatedOrder) throw new NotFoundError('order not found')

            return updatedOrder
        })
}

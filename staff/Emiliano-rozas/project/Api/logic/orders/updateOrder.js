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
    )
        .then(updatedOrder => {
            if (!updatedOrder) throw new NotFoundError('order not found');

            updatedOrder.id = updatedOrder._id.toString();
            delete updatedOrder._id;

            return updatedOrder;
        })
        .catch(error => {
            console.error('Error while updating order:', error);
            throw new SystemError(error.message);
        });
};

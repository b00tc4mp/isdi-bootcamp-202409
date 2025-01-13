import { Payment } from "dat";
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default async (paymentId) => {
    // Validar que el ID del pago sea válido
    validate.id(paymentId, 'paymentId');

    try {
        // Buscar el pago en la base de datos
        const payment = await Payment.findById(paymentId).lean();
        if (!payment) throw new NotFoundError('Payment not found');

        // Eliminar el pago
        await Payment.findByIdAndDelete(paymentId);

        return {
            message: 'Payment deleted successfully', paymentId
        };
    } catch (error) {
        console.error(error.message);
        throw new SystemError(error.message);
    }
};

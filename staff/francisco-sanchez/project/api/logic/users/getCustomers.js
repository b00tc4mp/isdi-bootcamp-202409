import { User } from 'dat';
import { errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId) => {

    return User.findById(userId) // Cambiado a `findById`
        .lean()
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found');
            }

            if (!user.customers || user.customers.length === 0) {
                throw new NotFoundError('No customers found for this user');
            }

            return user.customers.map(customerId => customerId.toString()); // Mapea los ObjectIds a strings
        })
        .catch(error => {
            // Si el error ya es de tipo NotFoundError, lo dejamos pasar
            if (error instanceof NotFoundError) {
                throw error;
            }

            throw new SystemError(error.message);
        });
};

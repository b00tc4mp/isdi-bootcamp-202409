import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, data) => {
    validate.id(userId, 'userId')

    return (async () => {
        try {
            const user = await User.findById(userId);
            if (!user) throw new NotFoundError('user not found');

            const dataToBeUpdated = {
                name: data.name || user.name,
                email: data.email || user.email,
                wetSuit: data.wetSuit || user.wetSuit,
                weight: data.weight || user.weight,
                tank: data.tank || user.tank,
                finns: data.finns || user.finns
            }
    
            User.findByIdAndUpdate(userId, dataToBeUpdated, { new: true })
                .then(updatedUser => {
                    if (updatedUser) return updatedUser;
                    else throw new Error('User not found');
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}
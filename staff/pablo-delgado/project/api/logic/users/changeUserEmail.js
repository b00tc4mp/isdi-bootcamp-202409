import { User } from '../../models/models.js';
import { validate, errors } from '../../../com/index.js';

const { SystemError, NotFoundError } = errors;

export default async function changeUserEmail(userId, newEmail) {
    validate.id(userId, 'userId');
    validate.email(newEmail, 'email');

    try {
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('User not found');

        user.email = newEmail;
        await user.save();
    } catch (error) {
        if (
            error instanceof NotFoundError ||
            error instanceof CredentialsError ||
            error instanceof ValidationError
        ) {
            throw error; // allow expected errors to pass through
        }

        throw new SystemError(error.message); // only unexpected errors
    }}
import { User } from '../../models/models.js';
import { validate, errors } from '../../../com/index.js';
import bcrypt from 'bcryptjs';

const { SystemError, NotFoundError, CredentialsError, ValidationError } = errors;

export default async function changeUserPassword(userId, oldPassword, newPassword) {
    validate.id(userId, 'userId');

    try {
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('User not found');

        validate.password(oldPassword, 'oldPassword');
        validate.password(newPassword, 'newPassword');

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) throw new CredentialsError('Incorrect current password');

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
    } catch (error) {
        if (
            error instanceof NotFoundError ||
            error instanceof CredentialsError ||
            error instanceof ValidationError
        ) {
            throw error; // only expected errors
        }

        throw new SystemError(error.message); // only unexpected errors
    }}
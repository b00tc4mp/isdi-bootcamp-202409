/* import { errors } from "com";
import { User } from 'dat'

const { SystemError, NotFoundError } = errors

// GET USER PROFILE
export default async (userId) => {
    try {
        const user = await User.findById(userId);
        console.log(user)
        if (!user) throw new NotFoundError('user not found');
        return user;
    } catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new SystemError(error.message)
    }
} */

import { errors } from "com";
import { User } from "dat";

const { SystemError, NotFoundError } = errors;

export default (userId) => {
    try {
        const user = User.findById(userId).lean();

        if (!user) throw new NotFoundError("user not found");

        return user;
    } catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new SystemError(error.message);
    }
};
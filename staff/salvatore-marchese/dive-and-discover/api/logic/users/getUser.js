import { errors } from "com";
import { User } from 'dat'

const { SystemError, NotFoundError } = errors

// GET USER DATA
export default async function getUser(userId) {
    try {
        const user = await User.findById(userId);
        console.log(user)
        if (!user) throw new NotFoundError('user not found');
        return user;
    } catch (error) {
        throw new SystemError(error.message)
    }
}
import { errors } from "com";
import { User } from "dat";
import { validate } from "com";

const { SystemError, NotFoundError } = errors;

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return (async () => {
        let user, targetUser

        try {
            user = await  User.findById(userId).lean();
        } catch (error) {
            throw new SystemError(error.message);
        }

        if (!user) throw new NotFoundError("user not found");

        try {
            targetUser = await User.findById(targetUserId).lean();
        } catch (error) {
            throw new SystemError(error.message);
        }

        if (!targetUser) throw new NotFoundError("target user not found");

        targetUser.id = targetUser._id.toString()
        delete targetUser._id

        return targetUser
    })()
};
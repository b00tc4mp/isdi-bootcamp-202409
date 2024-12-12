import { User } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async (userId, userUsername) => {
    // Validaciones de entrada
    validate.id(userId, "userId");
    validate.username(userUsername);

    try {
        // Busca el usuario principal por ID
        const user = await User.findById(userId).lean();
        if (!user) throw new NotFoundError("User not found");

        // Busca el usuario objetivo por email
        const targetUser = await User.findOne({ username: userUsername }).lean();
        if (!targetUser) throw new NotFoundError("Target user not found");

        // Devuelve el _id del usuario objetivo
        return targetUser._id.toString();
    } catch (error) {
        throw new SystemError(error.message);
    }
};

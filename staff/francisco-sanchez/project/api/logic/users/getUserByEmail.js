import { User } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async (userId, userEmail) => {
    // Validaciones de entrada
    validate.id(userId, "userId");
    validate.email(userEmail, "userEmail");

    try {
        // Busca el usuario principal por ID
        const user = await User.findById(userId).lean();
        if (!user) throw new NotFoundError("User not found");

        // Busca el usuario objetivo por email
        const targetUser = await User.findOne({ email: userEmail }).lean();
        if (!targetUser) throw new NotFoundError("Email not found");

        // Devuelve el _id del usuario objetivo
        return targetUser._id.toString();
    } catch (error) {
        throw new SystemError(error.message);
    }
};
